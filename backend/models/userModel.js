
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userShema = mongoose.Schema({
     name:{type: String , required:true},
     email:{type: String , required:true, unique:true},
     password:{type: String , required:true},
     pic:{type: String},
//      notifications: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Notification",
//   }
// ]

}, 
{timestamps:true}
);

userShema.methods.matchPassword = async function(enteredPassword){
     return await bcrypt.compare(enteredPassword , this.password);
}
userShema.pre('save',async function(next){
     if (!this.isModified('password')){
          next();
     }
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password , salt);
})

const User = mongoose.model("User" , userShema);
module.exports = User;
