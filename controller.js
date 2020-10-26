const { type } = require('os');
const db = require('./src/config/models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {SECRET_KEY} = process.env    
exports.createProduct = async (req, res) => {
    jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
        if (err) {
            return res.status(403).json({
                error: 'Unauthorized'
            })
        } else {
            try {
                let payload = {
                    name: req.body.name,
                    price: req.body.price,
                    image: req.file.path 
                }
                let product = await db.createProduct({
                    ...payload
                });
                res.status(200).json({
                    status: true, data: product
                })
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    error, status: false
                })
            }
        } 
    })
}

exports.editProduct = async (req, res) => {
    jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
        if (err) {
            return res.status(403).json({
                error: 'Unauthorized'
            })
        } else {
            try {
                let formerProduct = await db.getProductById(req.params.id)
                let payload = {
                    name: req.body.name || formerProduct.name,
                    price: req.body.price || formerProduct.price,
                }
                payload.image =  req.file ? req.file.path: formerProduct.image
                let product = await db.editProduct(req.params.id, {
                    ...payload
                });
                console.log(product)
                res.status(200).json({
                    status: true, data: product
                })
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    error, status: false 
                })
            }
        }
    })
 }

exports.getProducts = async (req, res) => {
    try {
        let products = await db.getProducts();
        res.status(200).json({
            status: true, data: products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error, status: false
        })
    } 
 }

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let product = await db.getProductById(id);
        res.status(200).json({
            status: true, data: product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error, status: false
        })
    } 
 }

exports.removeProduct = async (req, res) => {
    jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
        if (err) {
            res.status(403).json({
                error: 'Unauthorized'
            })
        } else {
            try {
                let id = req.params.id
                let product = await db.removeProduct(id);
                res.status(200).json({
                    status: true, data: product
                })
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    error, status: false
                })
            }   
        }
    })
 }

exports.category = async () => {
    const carts = await db.Categories.find().populate({
        path: "items.productId",
        select: "name price total"
    });;
    return carts[0];
};

exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}