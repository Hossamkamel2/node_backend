const validator = require('validator');

exports.getUserValidate = (req, res, next) => {
    const userId = req.params.userId;
    const errors = [];

    if(!userId){
        errors.push({key:"userId", errorMsg:"UserId field can't be Empty"});
    }
    else if (!validator.isMongoId(userId)) {
        errors.push({key:"userId", errorMsg:"This is not a valid userId"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}

exports.editUserValidate = (req, res, next) => {
    console.log(req.body)
    const username = req.body.username;
    const email = req.body.email;
    const gender = req.body.gender;
    const errors = [];

    if (!username || validator.isEmpty(username)) {
        errors.push({key:"username", errorMsg:"Username field can't be Empty"});
    }

    if (!email || validator.isEmpty(email)) {
        errors.push({key:"email", errorMsg:"Email field can't be Empty"});
    }else if(!validator.isEmail(email)){
        errors.push({key:"email", errorMsg:"This is not a valid Email"});
    }

    if(!gender){
        errors.push({key:"gender", errorMsg:"Gender field can't be Empty"});
    }else if(gender != 1 && gender != 2){
        errors.push({key:"gender", errorMsg:"This gender value is not correct"});
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