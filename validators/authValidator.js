const validator = require('validator');
const authController = require('../controllers/authController');

exports.loginValidate = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];

    if (!email || validator.isEmpty(email)) {
        errors.push({key:"email", errorMsg:"Email field can't be Empty"});
    }else if(!validator.isEmail(email)){
        errors.push({key:"email", errorMsg:"This is not a valid Email"});
    }

    if (!password || validator.isEmpty(password)) {
        errors.push({key:"password", errorMsg:"Password field can't be Empty"});
    }else if (!validator.isLength(password,{min:5})) {
        errors.push({key:"password", errorMsg:"Password can't be less than 5 characters"});
    }

    if(errors.length === 0){
        if(!await authController.IsEmailAndPasswordMatch(email,password)){
            errors.push({key:"email,password", errorMsg:"Email or Password is Incorrect"});
        }
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}


exports.registerValidate = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const gender = req.body.gender;
    const errors = [];

    if (!email || validator.isEmpty(email)) {
        errors.push({key:"email", errorMsg:"Email field can't be Empty"});
    }
    else if(!validator.isEmail(email)){
        errors.push({key:"email", errorMsg:"This is not a valid Email"});
    }
    else if((await authController.IsEmailExsist(email)).length !== 0){
        errors.push({key:"email", errorMsg:"Email is already exsist"});
    }

    if (!password || validator.isEmpty(password)) {
        errors.push({key:"password", errorMsg:"Password field can't be Empty"});
    }
    else if(!validator.isLength(password,{min:5})){
        errors.push({key:"password", errorMsg:"Password can't be less than 5 characters"});
    }

    if (!username || validator.isEmpty(username)) {
        errors.push({key:"username", errorMsg:"Username field can't be Empty"});
    }

    if(!gender){
        errors.push({key:"gender", errorMsg:"Gender field can't be Empty"});
    }
    else if(gender !== 1 && gender !== 2){
        errors.push({key:"gender", errorMsg:"This gender value is not correct"});
    }

    if(errors.length > 0){
        return res.status(200).send({
            Status: 422,
            Errors: errors
        });
    }
    next();
}