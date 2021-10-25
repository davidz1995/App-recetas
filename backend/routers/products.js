const express = require('express');
const router = express.Router();
const {Product} = require('../models/products');
const {Category} = require('../models/category');
const mongoose = require('mongoose');

router.get(`/`,async (req, res) =>{
    let filter = {};
    if(req.query.categories){
        filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).select('name description -_id').populate('category'); //select permite elegir que informacion recibir en response /populate permite relacionar colecciones como en tablas relacionales
    !productList? res.status(500).send('Product not found'):res.status(200).send(productList)
})

router.get('/:id', async (req,res) => {
    const product = await Product.findById(req.params.id).populate('category');
    !product? res.status(500).send('Product not found'):res.status(200).send(product);
})

router.put('/:id',async(req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {res.status(404).send('Invalid product ID')} //Validar el id del objeto
    const category = await Category.findById(req.body.category);
    if(!category) res.status(400).send('Invalid category');
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            countInStock: req.body.countInStock,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category
        },
        {new:true} //Esto hace que se retorne la nueva data en el response
    )

    !product?
        res.status(404).send('Product cant be updated'): res.status(200).send(product);
})

router.post(`/`,async (req, res) =>{
    const category = await Category.findById(req.body.category);
    if(!category) res.status(400).send('Invalid category'); 
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category
    })

    product = await product.save()
    !product? res.status(500).send('Product not created'):res.status(200).send(product)
})

router.delete('/:id',(req,res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        product? res.status(200).json({
            success: true,
            message: 'Product deleted'
        }) :
        res.status(404).json({
            succes:false,
            message:'Product not found'
        })
    })
    .catch(err => {
        return res.status(400).json({
            success:false,
            error:err
        })
    })
})

router.get('/get/count', async (req,res) => {
    const productCount = await Product.countDocuments((count) => count)
    !productCount? res.status(500).send('Product not found'):res.status(200).send({
        productCount: productCount});
})

router.get('/get/featured/:count', async (req,res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured:true}).limit(+count)
    !products? res.status(500).send('Product not found'):res.status(200).send(products);
})


module.exports = router