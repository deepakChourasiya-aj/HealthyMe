const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    location:{type:String},
    purchase:[
       {
        type:String,
        ref:"adminproductdata"
       }
    ]
}) 

// user A=[a,b,c];
// user B=[a,d]

const UserModel = mongoose.model('userdata',userSchema);
module.exports = {UserModel}