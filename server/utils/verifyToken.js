import  jwt  from "jsonwebtoken";
import { createError } from "./error.js";
export const generateToken = (user)=>{
  return jwt.sign({
      _id:user._id,
      names:user.names,
      address:user.address,
      phone:user.phone,
      nationalId:user.nationalId,
      email:user.email,
      isAdmin:user.isAdmin,

  },process.env.JWT_SECRET,{
      expiresIn:"30d"
  })
}
export const isAuth=(req,res,next)=>{
  const authorization=req.headers.authorization
  if(authorization){
      const token=authorization.slice(7,authorization.length); //Bearer xxxxxxx
      jwt.verify(
          token,
          process.env.JWT_SECRET,
          (err,decode)=>{
              if(err){
                  res.status(401).send({message:"Invalid token"})
              }else{
                  req.user=decode
                  next()
              }
          })
  }else{
      res.status(401).send({message:"You are not nauthorized a s admin"})
  }

}