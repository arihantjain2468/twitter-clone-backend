const StatusService = require('./status.service');

exports.add = function (req, res) {
    console.log("status yes"+req);
    StatusService.add(req)
        .on('ERROR', function () {
            res.status(500).send({
                error: "Internal Server Error"
            });
        })
        .on('SUCCESS', function () {
            res.send({
                message: "Status Added",
            });
        })
};

exports.fetchAll = function (req, res) {
    console.log("In fetch");
    StatusService.fetchData(req)
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
