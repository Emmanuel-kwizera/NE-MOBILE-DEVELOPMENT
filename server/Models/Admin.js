import mongoose from "mongoose"
import { registerSchema } from 'swaggiffy';
const adminSchema=new mongoose.Schema(
    {
      names:{
          type:String,
          required:true,
        },
        address:{
            type:String,
            required:true,
        },
      email:{
        type:String,
        required:true,
        unique:true
      },
      phone:{
        type:String,
        required:true,
        unique:true
      },
      nationalId:{
        type:String,
        required:true,
        unique:true
      },

      isAdmin:{
        type:Boolean,
        default:true,
      },
      password:{
        type:String,
        required:true
      }
},
{
    timestamps:true
}
)
registerSchema('Admin', adminSchema, {orm: 'mongoose'});
const Admin=mongoose.model("Admin",adminSchema)

export default Admin