const express = require('express');
const router = express.Router();
const {User} = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.get(`/`,async (req, res) =>{
    const usersList = await User.find().select('-password');
    !usersList? res.status(500).send('User not found'):res.status(200).send(usersList)
})

router.get('/:id',async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    !user? res.status(500).send('User not found'):res.status(200).send(user);
})

router.post(`/`, async (req, res) =>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        adress: req.body.adress,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    })
    user = await user.save();
    
    !user? res.status(400).send('User can not be created.'): res.status(200).send(user)
})

router.post('/login', async (req, res) => {
    const user = await user.findOne({emai:req.body.email});
    const secret = process.env.secret
    !user? res.status(400).send('User not found') : res.status(200).send(user)

    if(user && bcrypt.compareSync(req.body.password, user.password)){
        const token = jwt.sign({
            userId:user.id,
            isAdmin:user.isAdmin
        }, secret,{
            expireIn:'1d'
        })
        res.status(200).send({user: user.email, token: token});
    } else {
        res.status(400).send('Incorrect password');
    }
})

router.get('/get/count', async (req,res) => {
    const usersCount = await User.countDocuments((count) => count)
    !usersCount? res.status(500).send('Users not found'):res.status(201).send({
        productCount: usersCount});
})

router.delete('/:id',(req,res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        user? res.status(200).json({
            success: true,
            message: 'User deleted'
        }) :
        res.status(404).json({
            succes:false,
            message:'User not found'
        })
    })
    .catch(err => {
        return res.status(400).json({
            success:false,
            error:err
        })
    })
})

module.exports = router