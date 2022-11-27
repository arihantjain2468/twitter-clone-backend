const FollowingService = require('./following.service');

exports.add = function (req, res) {
    console.log("request"+req.body);
    FollowingService.add(req)
        .on('ERROR', function () {
            res.status(500).send({
                error: "Internal Server Error"
            });
        })
        .on('SUCCESS', function () {
            res.send({
                message: "follow",
            });
        })
};

exports.fetchAll = function (req, res) {
    console.log("In fetch");
    FollowingService.fetchData(req)
        .on('ERROR', function () {
            res.status(500).send({
                error: "Not found"
            });
        })
        .on('SUCCESS', function (result) {
            console.log(result);
            res.send({
              result
            });
        });
};

exports.fetchFeeds = function (req, res) {
    console.log("In fetch");
    FollowingService.feeds(req)
        .on('ERROR', function () {
            res.status(500).send({
                error: "Not found"
            });
        })
        .on('SUCCESS', function (result) {
            console.log(result);
            res.send({
              result
            });
        });
};
