import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser= async(req,res)=>{
    const {email,password}= req.body;
    try {
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({success:false,message:"user doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,massage:"Invalid Credentials"})
        }

        const token=createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }

}

//create token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser= async (req,res)=>{
    const {name,password,email}= req.body;
    try {
        //checking is uder already exist
        const exists= await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exist"})
        }
        //validating email format and a strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email"})
        }

        if(password.length<8){
                res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing user password
        const salt= await bcrypt.genSalt(10)
        const hasedPassword= await bcrypt.hash(password,salt);

        //create a new user with hased password and get the all data from req.body
        const newUser= new userModel({
            name: name,
            email: email,
            password: hasedPassword,
        })

        const user = await newUser.save(); //to save the new user in database

        const token= createToken(user._id)
         res.json({success:true,token});
    } catch (error) {
        console.log("error");
        res.json({success:false,message:"Error"});
    }
    
}
 export {loginUser,registerUser};