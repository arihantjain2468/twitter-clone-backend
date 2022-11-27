const jsonwebtoken = require('jsonwebtoken');
const variables = require('./variables');


exports.authenticate = (req, res, next) => {
  var token = req.header('authorization');
  if (token) {
    jsonwebtoken.verify(token, variables.key, function (err, decoded) {
        console.log("decoded"+decoded);
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