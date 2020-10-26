const express = require('express');
const { token } = require('morgan');
const productController = require('../controller');
const imageInstance = require('./config/imageHandler')
router = express.Router()

function verifyToken(req, res, next) {
    const tokenHeader = req.headers['authorization']
    if (typeof tokenHeader !== 'undefined') {
        const token = tokenHeader.split(' ')[1]
        req.token = token
        next()
    } else {
        res.status(403).json({
            error: 'Unauthorized'
        })
    }
}

router.post('/', verifyToken, imageInstance.upload.single('image'),
            productController.createProduct);
router.get('/', verifyToken, productController.getProducts)
router.get('/:id', productController.getProductById);
router.delete('/:id', verifyToken, productController.removeProduct);
router.put('/:id', verifyToken, productController.editProduct);

module.exports = router