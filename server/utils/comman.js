const jwt = require('jsonwebtoken');
const _  = require('lodash');
const config = require('../config/appConfig');

async function signToken(info) {
    console.log(info);
    let newToken = await jwt.sign(info, config.auth.secret, {
        expiresIn: config.auth.expireTime
    });

    return newToken;
}

async function isLoggedIn(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.header('Authorization');
    console.log(token);
    if (!token) 
      return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    // verifies secret and checks exp
    jwt.verify(req.header('Authorization'), config.auth.secret, function(err, decoded) {      
      if (err) 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      next();
    });
  
  }

module.exports = {
    signToken,  // 1,
    isLoggedIn  // 2 
}