const Mongoose=require('mongoose');

const StatusSchema = new Mongoose.Schema({
    email:{type:String,required:true,sparse:true},
    Status:[{
        tweet:{type:String,required:true,sparse:true}
    }]
})

const StatusModel=Mongoose.model('tweets',StatusSchema);

module.exports=StatusModel;