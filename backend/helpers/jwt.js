const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked: isRevoked //da seguridad para que solo Admins puedan acceder a control de la pagina
    }).unless({    //permite acceder a lo que se especifica aqui sin el token de autenticacion
        path:[
            {url: /\/api\/v1\/products(.*)/, methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods:['GET', 'OPTIONS']},
            `${api}/login`,
            `${api}/register`
        ]
    })
}

async function isRevoked(req, payload, done){
    if(!payload.isAdmin){
        done(null, true);
    }
    done();
}

module.exports = authJwt;