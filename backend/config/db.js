import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://hiranshivekariya:ranjansorthiya1976@cluster0.3wf3n.mongodb.net/food-del").then(()=>console.log("DB Connected"));
}

