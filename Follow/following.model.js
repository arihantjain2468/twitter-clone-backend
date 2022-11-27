const Mongoose=require('mongoose');

const FollowingSchema = new Mongoose.Schema({
    email:{type:String,required:true,sparse:true},
    Follow:[{
        id:{type:String,required:true,sparse:true}
    }]
})

const FollowingModel=Mongoose.model('follow',FollowingSchema);

module.exports=FollowingModel;