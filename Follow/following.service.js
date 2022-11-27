const FollowingModel = require('./following.model');
const EventEmitter = require('events');
const UserModel = require('../User/user.model');
const StatusModel = require('../Status/status.model');

exports.add = function (data) {
    var emitter = new EventEmitter();

    FollowingModel.find({email:data.query.email}).then(function (result) {
        console.log("result"+result)
        console.log("email found"+data.query.email +" "+data.body);
        if(result.length==0){
                console.log("add data start"+data.query.email);

                var followUser = new FollowingModel({email:data.query.email,Follow:data.body});
                followUser.save()
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
            FollowingModel.updateOne(
                { email:data.query.email },
                { $push: { Follow: data.body } },
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

exports.fetchData = function (data) {
    var emitter = new EventEmitter();
    var UserNotFollowing = [];
    UserNotFollowing.push(data.query.email);

    FollowingModel.find({email:data.query.email}).then(function (result) {
         
        console.log("0 check result"+result);

        if(result.length>0){

        result[0].Follow.forEach(item => UserNotFollowing.push(item.id));

        console.log("user "+UserNotFollowing);
        }

        UserModel.find({email:{$nin:UserNotFollowing}}).then(function(list){
        
            emitter.emit("SUCCESS",list);

        },function (error) {
            if (error) {
                emitter.emit("ERROR");
            }
            }) 
        , function (error) {
        if (error) {
            emitter.emit("ERROR");
        }
        } 
    });
    return emitter;
}

exports.feeds = function (data) {
    var emitter = new EventEmitter();
    var UserFollowing = [];

    FollowingModel.find({email:data.query.email}).then(function (result) {

        console.log("follow"+result+" "+"sjhskj"+result[0]);

        if(result.length>0){
        result[0].Follow.forEach(item => UserFollowing.push(item.id));
        }

        StatusModel.find({email:{$in:UserFollowing}}).then(function(list){
            var feedsList = []; 
            list.forEach((item)=>{
                item.Status.forEach((followingUserStatusLoop) => {
                      feedsList.push({
                        "email":item.email,
                        "tweet":followingUserStatusLoop.tweet 
                      });
                });
            });
        
            emitter.emit("SUCCESS",feedsList);

        },function (error) {
            if (error) {
                emitter.emit("ERROR");
            }
        }) 
        , function (error) {
        if (error) {
            emitter.emit("ERROR");
        }
        } 
    });
    return emitter;
}

