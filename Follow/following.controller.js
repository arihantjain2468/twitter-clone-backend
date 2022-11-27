const FollowingService = require('./following.service');

exports.add = function (req, res) {
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
