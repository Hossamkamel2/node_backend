const validator = require('validator');

exports.getProductByIdValidate = (req, res, next) => {
    const productId = req.params.productId;
    const errors = [];

    if(!productId){
        errors.push({key:"productId", errorMsg:"ProductId field can't be Empty"});
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

exports.getUserProductsValidate = (req, res, next) => {
    const userId = req.params.userId;
    const errors = [];

    if(!userId){
        errors.push({key:"userId", errorMsg:"UserId field can't be Empty"});
    }else if (!validator.isMongoId(userId)) {
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

exports.getProductsPagination = (req, res, next) => {
    const pageSize = req.query.pageSize;
    const pageNumber = req.query.pageNumber;
    const errors = [];

    if(pageSize < 1){
        errors.push({key:"pageSize", errorMsg:"Page Size can't be Less than 1"});
    }

    if(pageNumber < 1){
        errors.push({key:"pageNumber", errorMsg:"Page Number can't be Less than 1"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}

exports.addProductValidate = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const errors = [];
    
    if (!title || validator.isEmpty(title)) {
        errors.push({key:"title", errorMsg:"Title field can't be Empty"});
    }

    if(!price){
        errors.push({key:"price", errorMsg:"Price field can't be Empty"});
    }else if (price < 0) {
        errors.push({key:"price", errorMsg:"Price field can't be less than zero"});
    }

    if(req.imageFormatError){
        errors.push({key:"imageUrl", errorMsg:"Only .png, .jpg and .jpeg format allowed!"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}

exports.deleteProductValidate = (req, res, next) => {
    const productId = req.params.productId;
    const errors = [];

    if(!productId){
        errors.push({key:"productId", errorMsg:"ProductId field can't be Empty"});
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


exports.editProductValidate = (req, res, next) => {
    const productId = req.body._id;
    const title = req.body.title;
    const price = req.body.price;
    const errors = [];

    if (!productId) {
        errors.push({key:"productId", errorMsg:"ProductId can't be Empty"});
    }
    else if (!validator.isMongoId(productId)) {
        errors.push({key:"productId", errorMsg:"This is not a valid id"});
    }

    if(!title){
        errors.push({key:"title", errorMsg:"Title field can't be Empty"});
    }
    else if (validator.isEmpty(title)) {
        errors.push({key:"title", errorMsg:"Title field can't be Empty"});
    }

    if (!price) {
        errors.push({key:"price", errorMsg:"Price field can't be Empty"});
    }
    else if (price < 0) {
        errors.push({key:"price", errorMsg:"Price field can't be less than zero"});
    }

    if(req.imageFormatError){
        errors.push({key:"imageUrl", errorMsg:"Only .png, .jpg and .jpeg format allowed!"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}