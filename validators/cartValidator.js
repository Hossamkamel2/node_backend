const validator = require('validator');

exports.addToCartValidate = (req, res, next) => {
    const productId = req.body.productId;
    const errors = [];

    if(!productId){
        errors.push({key:"productId", errorMsg:"productId field can't be Empty"});
    }else if (!validator.isMongoId(productId)) {
        errors.push({key:"productId", errorMsg:"This is not a valid id"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}

exports.reduceOneProductFromCartValidate = (req, res, next) => {
    const productId = req.params.productId;
    const errors = [];

    if(!productId){
        errors.push({key:"productId", errorMsg:"productId field can't be Empty"});
    }else if (!validator.isMongoId(productId)) {
        errors.push({key:"productId", errorMsg:"This is not a valid id"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}