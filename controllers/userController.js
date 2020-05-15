const User = require('../models/userModel');
const fs = require('fs');

exports.getUser = (req, res, next) => {
    User.findById(req.userId)
        .then(user => {
            if (!user) {
                res.status(200).send({
                    Status: 404,
                    Errors: [{
                        key: "userId",
                        errorMsg: "This user is not found"
                    }]
                })
            }
            else {
                if (user.profileImgUrl != '') {
                    if (fs.existsSync('./uploads/' + user.profileImgUrl)) {
                        user.profileImgUrlBinary = fs.readFileSync('./uploads/' + user.profileImgUrl, { encoding: 'base64' });
                    }
                    else {
                        if(user.gender == 1)
                            user.profileImgUrlBinary = fs.readFileSync('./uploads/male.jpg', { encoding: 'base64' });
                        else if(user.gender == 2)
                            user.profileImgUrlBinary = fs.readFileSync('./uploads/female.jpg', { encoding: 'base64' });
                    }
                }
                res.status(200).send({_id:user._id, email: user.email, username: user.username, imageUrlBinary: user.profileImgUrlBinary, imageUrl: user.profileImgUrl, gender: user.gender});
            }
        })
        .catch((err) => {
            res.status(500).send({
                Errors: [{
                    key: "server",
                    errorMsg: "something went wrong"
                }]
            })
        })
};

exports.editUser = async (req, res, next) => {
    const user = await User.findById(req.userId);
    user.username = req.body.username;
    user.gender = req.body.gender;
    user.profileImgUrl = req.body.imageUrl;
    user.save().then((doc) => {
        return res.status(200).send({success: true});
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

