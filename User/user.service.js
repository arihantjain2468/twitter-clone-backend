const EventEmitter = require('events');
const UserModel = require('./user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const variables = require('../variables');

exports.createUser = function (data) {
    var emitter = new EventEmitter();
    console.log("Request: ",data);
    bcrypt.hash(data.password, variables.hashValue, function (error, hash) {
        if (error) {
            console.log("Error occured while encrypting" + error);
        } else {
            data.password = hash;
            var userdata = new UserModel(data);
            userdata.save().then(function (result) {
                console.log("result of db operation ", result)
                emitter.emit('SUCCESS', result)
            }, function (error) {
                console.log("error of db operation ", error)
                if (error.code == 11000) {
                    emitter.emit('DUPLICATE')
                }
                else
                    emitter.emit('ERROR');

            });
        }
    });
    return emitter;
};
exports.createToken = function (data) {
    var emitter = new EventEmitter();

    jsonwebtoken.sign({ email: data.email, password: data.password },
        variables.key, {
        expiresIn: 60
    },
        (err, token) => {
            if (err) {
                console.log("error: " + err.toString())
                emitter.emit("ERROR");
            }
            else {
                console.log("token" + token);
                emitter.emit("SUCCESS", token);
            }
        });
    return emitter;
}
exports.findUser = function (data) {
    var emitter = new EventEmitter();
    console.log('old: ' + data.password);

    var query = {
        email: data.email
    }

    UserModel.findOne(query).then((result) => {
        console.log("stored");
        bcrypt.compare(data.password, result.password,
            function (err, res) {
                if (res)
                    emitter.emit('SUCCESS', result);
                else
                    emitter.emit('UNABLE');
            });
    }).catch(err => emitter.emit('UNABLE'));


    return emitter;
};


