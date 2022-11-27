const StatusModel = require('./status.model');
const EventEmitter = require('events');


exports.add = function (data) {
    var emitter = new EventEmitter();

    StatusModel.find({email:data.query.email}).then(function (result) {
        if(result.length==0){
                var addStatus = new StatusModel({email:data.query.email,Status:data.body});
                addStatus.save()
                    .then(
                        function (result) {
                            emitter.emit('SUCCESS', result);
                        },
                        function (error) {
        
                            if (error.code == 11000) {
                                emitter.emit('DUPLICATE')
                            }
                            else
                                emitter.emit('ERROR');
                        }
                    );
        }else{
            StatusModel.updateOne(
                { email:data.query.email },
                { $push: { Status: data.body } },
                function (error, success) {
                    if (error) {
                        emitter.emit('ERROR');
                        console.log(error);
                    } else {
                        emitter.emit('SUCCESS');
                        console.log(success);
                    }
                });
        }
    }, function (error) {
        console.log("email not present false"+error);
    });

    
    return emitter;
};

