const UserService = require('./user.service');

exports.register = function (req, res) {
    UserService.createUser(req.body)
        .on('ERROR', function () {
            res.status(500).send({
                error: "Internal Server Error",
                result:0
            })
        })
        .on('SUCCESS', function (data1) {
            
            UserService.createToken(req.body)
                .on('ERROR', function () {
                    console.log("Token failed");
                })
                .on('SUCCESS', function (result2) {
                    res.set('Token', result2);
                    res.send({
                        data1,
                        token: result2,
                        result:1
                    })
                });

        })
        .on('DUPLICATE', function () {
            res.send({
                message: "User already exists"
            })
        })
}
exports.login = function (req, res) {
    console.log("Aj",req.body);
    UserService.findUser(req.body)
        .on('UNABLE', function () {
            res.send({
                result:0,
                message: "Unable to Login"
            })
        })
        .on('ERROR', function () {
            res.status(500).send({
                error: "Login Unsuccessful"
            })
        })
        .on('SUCCESS', function (data1) {
            UserService.createToken(req.body)
                .on('ERROR', function () {
                    console.log("Token failed");
                })
                .on('SUCCESS', function (result2) {
                    console.log("Token register" + result2);
                    res.set('Token', result2);
                    res.send({
                        data1,
                        result:1,
                        token:result2,
                        message: "Login Success"
                    });
                });
        })
}







