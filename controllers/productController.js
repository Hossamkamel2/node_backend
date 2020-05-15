const Product = require('../models/productModel');
const fs = require('fs');

exports.getProductById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (product.imageUrl != '') {
                if (fs.existsSync('./uploads/' + product.imageUrl)) {
                    product.imageUrl = fs.readFileSync('./uploads/' + product.imageUrl, { encoding: 'base64' });
                }
                else {
                    product.imageUrl = fs.readFileSync('./uploads/product.jpg', { encoding: 'base64' });
                }
            }
            res.status(200).send(product)
        })
        .catch(err => {
            res.status(500).send(
                {
                    Errors: [{
                        key: "server",
                        errorMsg: "some thing went wrong"
                    }]
                })
        })
};

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            products.forEach(product => {
                if (product.imageUrl != '') {
                    if (fs.existsSync('./uploads/' + product.imageUrl)) {
                        product.imageUrl = fs.readFileSync('./uploads/' + product.imageUrl, { encoding: 'base64' });
                    }
                    else {
                        product.imageUrl = fs.readFileSync('./uploads/product.jpg', { encoding: 'base64' });
                    }
                }
            })
            res.status(200).send(products)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(
                {
                    Errors: [{
                        key: "server",
                        errorMsg: "some thing went wrong"
                    }]
                })
        })
};

exports.getProductsWithPagination = async (req, res, next) => {
    const pageSize = req.query.pageSize || 5;
    const pageNumber = req.query.pageNumber || 1;
    const productsTotalNum = await Product.count();

    Product.find().skip((Number.parseInt(pageNumber) - 1) * Number.parseInt(pageSize)).limit(Number.parseInt(pageSize))
        .then(products => {
            products.forEach(product => {
                if (product.imageUrl != '') {
                    if (fs.existsSync('./uploads/' + product.imageUrl)) {
                        product.imageUrl = fs.readFileSync('./uploads/' + product.imageUrl, { encoding: 'base64' });
                    }
                    else {
                        product.imageUrl = fs.readFileSync('./uploads/product.jpg', { encoding: 'base64' });
                    }
                }
            })  
            res.status(200).send({ products: products, totalCount: productsTotalNum })
        })
        .catch(err => {
            res.status(500).send(
                {
                    Errors: [{
                        key: "server",
                        errorMsg: "some thing went wrong"
                    }]
                })
        })
};

exports.getUserProducts = (req, res, next) => {
    Product.find({ userId: req.params.userId })
        .then(products => res.status(200).send(products))
        .catch(err => {
            res.status(500).send(
                {
                    Errors: [{
                        key: "server",
                        errorMsg: "some thing went wrong"
                    }]
                })
        })
};

exports.addProduct = async (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.userId,
    })
    product.save().then(product => res.status(201).send(product))
        .catch((err) => res.status(500).send(
            {
                Errors: [{
                    key: "server",
                    errorMsg: "some thing went wrong"
                }]
            }
        ));
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByIdAndDelete(productId)
        .then(product => {
            if (fs.existsSync('./uploads/' + product.imageUrl)) {
                fs.unlinkSync('./uploads/' + product.imageUrl);
            }
            res.status(200).send({ success: true })
        })
        .catch((err) => res.status(500).send(
            {
                Errors: [{
                    key: "server",
                    errorMsg: "some thing went wrong"
                }]
            }
        ));
};

exports.editProduct = async (req, res, next) => {
    const product = await Product.findById(req.body._id);
    if (!Product) {
        return res.status(200).send({
            Status: 404,
            Errors: [{
                key: "productId",
                errorMsg: "This product is not found"
            }]
        })
    }
    product.title = req.body.title;
    product.price = req.body.price;
    if(req.body.imageUrl != '')
        product.imageUrl = req.body.imageUrl === undefined ? "product.jpg" : req.body.imageUrl;
    product.description = req.body.description === undefined ? "" : req.body.description;

    product.save().then((product) => {
        return res.status(200).send(product);
    })
        .catch((err) => {
            res.status(500).send({
                Errors: [{
                    key: "server",
                    errorMsg: "something went wrong"
                }]
            })
        });
};