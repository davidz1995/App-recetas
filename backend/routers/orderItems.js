const express = require('express');
const router = express.Router();
const {OrderItems} = require('../models/orderItems')

router.get(`/`,async (req, res) =>{
    const orderItemsList = await OrderItems.find();
    !orderItemsList? res.status(500).send('Order items not found'):res.status(200).send(orderItemsList)
})

router.post(`/`,(req, res) =>{
    const orderItems = new OrderItems({
        product: req.body.product,
        quantity: req.body.quantity,
    })
    orderItems.save()
    .catch(err => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
    res.send(orderItems)
})

module.exports = router