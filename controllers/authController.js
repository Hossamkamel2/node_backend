const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.verify = (req, res, next) => {
    const token = req.body.token;
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(200).send({isAuth: false, isAdmin: false});
        else
            return res.status(200).send({isAuth: true, isAdmin: decoded.isAdmin});
      });
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
        
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, token: token, isAdmin: user.isAdmin });
      });
};

exports.signup = (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = new User({
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
        username: req.body.username,
        isAdmin: false,
        profileImgUrl: req.body.profileImgUr,
        gender: req.body.gender,
        cart: { items: [] }
    });

    user.save()
    .then(result => {
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token, isAdmin: user.isAdmin });
    })
    .catch((err) => res.status(500).send(
        {Errors: [{
            key:"server",
            errorMsg: "some thing went wrong"
        }]}
    ));
};

exports.logout = (req, res, next) => {
    res.status(200).send({ auth: false, token: null });
};

exports.IsEmailAndPasswordMatch = (email, password) => {
    return User.findOne({ email: email.toLowerCase() })
        .then(user => {
            if(user)
                return bcrypt.compare(password, user.password)
            else return false
        })
};

exports.IsEmailExsist = (email) => {
    return User.find({ email: email.toLowerCase() })
};