const validator = require('validator');

exports.getOrderByIdValidate = (req, res, next) => {
    const orderId = req.params.orderId;
    const errors = [];

    if (!orderId) {
        errors.push({key:"orderId", errorMsg:"OrderId field can't be Empty"});
    }else if(!validator.isMongoId(orderId)){
        errors.push({key:"orderId", errorMsg:"This is not a valid id"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}

exports.getUserOrdersValidate = (req, res, next) => {
    const userId = req.params.userId;
    const errors = [];

    if (!userId) {
        errors.push({key:"userId", errorMsg:"UserId field can't be Empty"});
    }else if(!validator.isMongoId(userId)){
        errors.push({key:"userId", errorMsg:"This is not a valid id"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}

exports.deleteOrderValidate = (req, res, next) => {
    const orderId = req.params.orderId;
    const errors = [];

    if (!orderId) {
        errors.push({key:"orderId", errorMsg:"OrderId field can't be Empty"});
    }else if(!validator.isMongoId(orderId)){
        errors.push({key:"orderId", errorMsg:"This is not a valid id"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}

exports.changeOrderStatusValidate = (req, res, next) => {
    const orderId = req.body.orderId;
    const statusId = req.body.statusId;
    const errors = [];

    if (!orderId) {
        errors.push({key:"orderId", errorMsg:"OrderId vield can't be Empty"});
    }else if(!validator.isMongoId(orderId)){
        errors.push({key:"orderId", errorMsg:"This is not a valid id"});
    }

    if (!statusId) {
        errors.push({key:"statusId", errorMsg:"StatusId field can't be Empty"});
    }else if (statusId != 1 && statusId != 2 && statusId != 3) {
        errors.push({key:"statusId", errorMsg:"StatusId value is not correct"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}