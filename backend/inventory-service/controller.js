const Product = require('./product')
const mongoose = require('mongoose')

//Create Product
const createProduct = async(req, res) =>{
    const {name, description, stock, price} = req.body

    try{
        const product = await Product.create({name, description, stock, price})
        res.status(200).json({success: true, message: product})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}

//get all products
const getAllProducts = async(req, res) =>{
    try{
        const products = await Product.find({})
        res.status(200).json({success: true, message: products})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}


//Reduce Stock
const reduceStock = async(req, res) =>{
    const {productId} = req.params
    const {sold} = req.body

    if(!mongoose.Types.ObjectId.isValid(productId)){
        res.status(400).json({success: false, messsage: `Invalid ID: ${productId}`})
    }

    try {
        const product = await Product.findById(productId)

        if(!product){
            res.status(404).json({success: false, message: `No such product exist with an ID: ${productId}`})
        }

        if(sold > product.stock){
            res.status(500).json({success: false, message: `The stock of ${product.name} is insufficient`})
        }
        
        product.stock -= sold
        await product.save()

        res.status(200).json({success: true, message: product})

    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    reduceStock
}