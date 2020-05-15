
function isAdmin(req, res, next) {
    if(req.isAdmin === false)
      return res.status(200).send({ Status: 403, auth: false, message: 'You are not Authorized.' });
    next();
  }
  
  module.exports = isAdmin;