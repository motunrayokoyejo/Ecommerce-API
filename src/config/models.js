const mongoose = require('mongoose')
const { stringify } = require('querystring')

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const categorytSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "Please include the product name"]
    }
});

let productSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    name: {
        type: String, required: [true, "Please include the product name"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const categorySchema = new mongoose.Schema({
    name: {
        type: String, required: true
    }
})

User = mongoose.model('user', userSchema)
const Products = mongoose.model('products', productSchema)
const Categories = mongoose.model('categories', categorySchema)

const getProducts = async () => {
    const products = await Products.find();
    return products;
};

const getProductById = async id => {
    const product = await Products.findById(id);
    return product
};
 
const createProduct = async payload => {
    const newProduct = await Products.create(payload);
    console.log(payload)
    return newProduct
};

const removeProduct = async id => {
    const product = await Products.findByIdAndRemove(id);
    return product
}

const editProduct = async (id, payload) => {
    const product = await Products.findByIdAndUpdate(id, payload);
    return product
}


module.exports = {
    createProduct, removeProduct, getProductById, getProducts, editProduct, User, Categories
}