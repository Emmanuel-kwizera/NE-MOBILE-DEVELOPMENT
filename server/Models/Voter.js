import mongoose from "mongoose"
import { registerSchema } from 'swaggiffy';
const voterSchema=new mongoose.Schema(
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
        type:Number,
        required:true,
        unique:true
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
registerSchema('Voter', voterSchema, {orm: 'mongoose'});
const Voter=mongoose.model("Voter",voterSchema)
export default Voter;