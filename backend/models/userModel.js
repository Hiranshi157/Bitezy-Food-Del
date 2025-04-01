import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false}) //we add minimize:false beacuse we not provided any data in cartData as set as default if we can't write minimize:false cartData will not be create


const userModel=mongoose.models.user|| mongoose.model("user",userSchema);
export default userModel;