const Mongoose=require('mongoose');

const UserSchema = new Mongoose.Schema({
    email:{type:String ,unique:true ,required:true},
    name:{type:String,required:true},
    password:{type:String},
    phone:{type:Number},
});

const UserModel=Mongoose.model('users',UserSchema);

module.exports=UserModel;