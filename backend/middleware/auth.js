import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{
    const {token}=req.headers; //get the tokens from headers
    if (!token) {
        return res.json({success:false,message:"Not Authorized"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET); //decode the token to get userid
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});   
        
    }
}
export default authMiddleware;