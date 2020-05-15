const User = require('../models/userModel');
const Product = require('../models/productModel');

exports.addToCart = async (req, res, next) => {
    const productId = req.body.productId;
    const product = await Product.findById(productId);
    if(!product){
        return res.status(200).send(
            {
                Status: 404,
                Errors: [{
                    key: "productId",
                    errorMsg: "This product is not found"
                }]
            })
    }
    const user = await User.findById(req.userId);
    let result = user.cart.items.find(product => product.productId == productId);
    
    if(result){
        user.cart.items.find(product => product.productId == productId).quantity++;
    }else{
        user.cart.items.push({productId: productId, quantity: 1})
    }
    user.save().then(() => res.status(201).send({success:true}))
    .catch(() => {
        res.status(500).send(
            {
                Errors: [{
                    key: "server",
                    errorMsg: "some thing went wrong"
                }]
            })
    })
};

exports.reduceOneProductFromCart = async (req, res, next) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if(!product){
        return res.status(200).send(
            {
                Status: 404,
                Errors: [{
                    key: "productId",
                    errorMsg: "This product is not found"
                }]
            })
    }
    const user = await User.findById(req.userId);
    let result = user.cart.items.find(product => product.productId == productId);

    if(result){
        const cartProduct = user.cart.items.find(product => product.productId == productId);
        cartProduct.quantity--;
        if(cartProduct.quantity <= 0){
            user.cart.items = user.cart.items.filter(product => product.productId != productId);
        }
    }
    else{
        return res.status(200).send(
            {
                Status: 404,
                Errors: [{
                    key: "productId",
                    errorMsg: "User cart doesn't contain this product"
                }]
            })
    }

    user.save().then(() => res.status(200).send({success:true}))
    .catch(() => {
        res.status(500).send(
            {
                Errors: [{
                    key: "server",
                    errorMsg: "some thing went wrong"
                }]
            })
    })
};

exports.removeProductFromCart = async (req, res, next) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if(!product){
        return res.status(200).send(
            {
                Status: 404,
                Errors: [{
                    key: "productId",
                    errorMsg: "This product is not found"
                }]
            })
    }
    const user = await User.findById(req.userId);
    let result = user.cart.items.find(product => product.productId == productId);

    if(result){
        user.cart.items = user.cart.items.filter(product => product.productId != productId);
    }
    else{
        return res.status(200).send(
            {
                Status: 404,
                Errors: [{
                    key: "productId",
                    errorMsg: "User cart doesn't contain this product"
                }]
            })
    }

    user.save().then(() => res.status(200).send({success:true}))
    .catch(() => {
        res.status(500).send(
            {
                Errors: [{
                    key: "server",
                    errorMsg: "some thing went wrong"
                }]
            })
    })
};

exports.clearUserCart = async (req, res, next) => {
    const user = await User.findById(req.userId);
    user.cart.items = [];

    user.save().then(() => res.status(200).send({success:true}))
    .catch(() => {
        res.status(500).send(
            {
                Errors: [{
                    key: "server",
                    errorMsg: "some thing went wrong"
                }]
            })
    })
};

exports.getCart = (req, res, next) => {
    User.findById(req.userId)
    .then(user => res.status(200).send(user.cart))
    .catch(err => {
        return res.status(500).send(
            {
                Errors: [{
                    key: "server",
                    errorMsg: "some thing went wrong"
                }]
            })
    })
};