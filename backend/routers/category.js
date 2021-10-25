const express = require('express');
const router = express.Router();
const {Category} = require('../models/category')

router.get(`/`,async (req, res) =>{
    const categoryList = await Category.find();
    !categoryList? res.status(500).send('Category not found'):res.status(200).send(categoryList);
})

router.get('/:id',async(req, res) => {
    const category = await Category.findById(req.params.id)
    !category? res.status(500).send('Category not found'):res.status(200).send(category);
})

router.post(`/`,async (req, res) =>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        flavour: req.body.flavour,
    })
    category = await category.save();

    !category?
        res.status(404).send('Category cant be created'): res.status(201).send(category);
})

router.put('/:id',async(req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon:req.body.icon,
            flavour:req.body.flavour
        },
        {new:true} //Esto hace que se retorne la nueva data en el response
    )

    !category?
        res.status(404).send('Category cant be updated'): res.status(201).send(category);
})

//Este metodo no va con aync/await, sino con promesas, se puede cambiar para hacerlo con menos codigo
router.delete('/:id',(req,res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        category? res.status(200).json({
            success: true,
            message: 'Category deleted'
        }) :
        res.status(404).json({
            succes:false,
            message:'Category not found'
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