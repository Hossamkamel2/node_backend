const jwt = require('jsonwebtoken');
const config = require('../config');

function isAuth(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(200).send({Status: 404, auth: false, message: 'No token provided.' });
    
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(200).send({Status: 500, auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  });
}

module.exports = isAuth;