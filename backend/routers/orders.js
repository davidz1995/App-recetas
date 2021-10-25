const express = require('express');
const router = express.Router();
const {Order} = require('../models/orders')
const {OrderItem} =require('../models/orderItems')

router.get(`/`,async (req, res) =>{
    const orderList = await Order.find();
    !orderList? res.status(500).send('Order not found'):res.status(200).send(orderList)
})

router.post(`/`, async(req, res) =>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
            })
            newOrderItem = await newOrderItem.save();

            return newOrderItem._id
    }))

    const orderItemsIdsResolved = await orderItemsIds 

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shipingAdress: req.body.shipingAdress,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
        dateOrdered: req.body.dateOrdered
    })
    order = await order.save()
    !order? res.status(400).send('Order cannot be created'): res.status(200).send(order);
})

module.exports = router