const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');


exports.getOrderById = (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => res.status(200).send(product))
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

exports.getMyOrders = (req, res, next) => {
    Order.find({ "user": req.userId })
        .then(orders => {
            let newOrders = [];
            orders.forEach(order => {
                let newOrder = {};
                let totalPrice = 0;
                let productTitles = '';
                order.products.forEach(product => {
                    totalPrice += product.product.price * product.quantity;
                    productTitles += product.product.title + ' ( '+ product.quantity +' ), '
                })
                newOrder = {
                    date: order.date.toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }),
                    status: order.status,
                    totalPrice: totalPrice,
                    productTitles: productTitles,
                    orderId: order._id
                };
                newOrders.push(newOrder);
            });
            res.status(200).send(newOrders)
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

exports.getAllOrders = (req, res, next) => {
    Order.find().populate("user")
        .then(orders => {
            let newOrders = [];
            orders.forEach(order => {
                let newOrder = {};
                let totalPrice = 0;
                let productTitles = '';
                order.products.forEach(product => {
                    totalPrice += product.product.price * product.quantity;
                    productTitles += product.product.title + ' ( '+ product.quantity +' ), '
                })
                newOrder = {
                    date: order.date.toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }),
                    status: order.status,
                    totalPrice: totalPrice,
                    productTitles: productTitles,
                    orderId: order._id,
                    username: order.user.username
                };
                newOrders.push(newOrder);
            });
            res.status(200).send(newOrders)
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

exports.changeOrderStatus = async (req, res, next) => {
    const orderId = req.body.orderId;
    const statusId = req.body.statusId;
    const order = await Order.findById(orderId);
    if (!order) {
        res.status(200).send({
            Status: 404,
            Errors: [{
                key: "orderId",
                errorMsg: "This Order is not found"
            }]
        })
    }
    order.status = statusId;
    order.save().then(async (doc) => {
        return res.status(200).send({ success: true });
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

exports.addOrder = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (user.cart.items.length <= 0) {
        return res.status(200).send({
            Status: 422,
            Errors: [{
                key: "order",
                errorMsg: "There is no products in cart"
            }]
        })
    }
    const productsObjects = await Product.find({ '_id': { $in: user.cart.items.map(p => p.productId) } })
    let products = []
    for (let i = 0; i < productsObjects.length; i++) {
        products.push({ product: productsObjects[i], quantity: user.cart.items.map(p => p.quantity)[i] })
    }
    const order = new Order({ products: products, date: Date.now(), status: 1, user: user._id })
    order.save().then(async (doc) => {
        user.cart.items = [];
        await user.save();
        return res.status(200).send({ success: true });
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

exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    let order = await Order.findById(orderId);
    if(order.status == 1){
        Order.findByIdAndDelete(orderId)
        .then(() => res.status(200).send({ success: true }))
        .catch((err) => res.status(500).send(
            {
                Errors: [{
                    key: "server",
                    errorMsg: "some thing went wrong"
                }]
            }
        ));
    }
    else{
        res.status(200).send({
            Status: 422,
            Errors: [{
                key: "status",
                errorMsg: "Can't delete this order"
            }]
        })
    }

};