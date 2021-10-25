require('dotenv/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');//import cors library
const { auth, requiresAuth } = require('express-openid-connect');//auth0

//Importar routers
const productsRouter = require('./routers/products');
const categoryRouter = require('./routers/category');
const orderItemsRouter = require('./routers/orderItems');
const orderRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const errorHandler = require('./helpers/errorHandler');

//Enable CORS
app.use(cors());
app.options('*', cors());

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(errorHandler)
//auth0 middleware
app.use(
    auth({
      authRequired: false,
      auth0Logout:true,
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.CLIENT_ID,
      secret: process.env.SECRET,
      idpLogout: true,
    })
  );

//Routers
app.use(`/products`, productsRouter);
app.use(`/users`,requiresAuth(), usersRouter);
app.use(`/categories`, categoryRouter);
app.use(`/orders`,requiresAuth(), orderRouter);
app.use(`/orderItems`,requiresAuth(), orderItemsRouter);

//auth0 route
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated()? 'Logged in':'Logged out')
} )
app.get(`/profile`, requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user))
})

//Conexion con MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database connection is ready');
})
.catch(()=>{
    console.log('Can not connect to database');
})

//Inicio de servidor
app.listen(3000, ()=>{
    console.log('Server is running in port 3000');
})