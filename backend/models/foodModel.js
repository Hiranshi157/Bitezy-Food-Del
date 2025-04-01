import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    price: {type:Number, required: true},
    image: {type:String,required: true},
    category: {type:String, required: true}
})

//here use OR oprator because when we run file again there is no run  model again
//it means if model is there then run it and if there is no model then cretae a new model
const foodModel= mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;