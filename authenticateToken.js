const jsonwebtoken = require('jsonwebtoken');
const variables = require('../variables');


exports.authenticate = (req, res, next) => {
  var token = req.get('Token');

  if (token) {
    jsonwebtoken.verify(token, variables.key, function (err, decoded) {
      if (decoded) {
        next();
      } else {
        res.send({
          message: "Not authorised"
        })
      }
    });
  } else {
    res.send({
      message: "Token not found"
    })
  }

}