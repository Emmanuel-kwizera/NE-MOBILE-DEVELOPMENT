import mongoose from "mongoose"
import { registerSchema } from 'swaggiffy';
const candidateSchema=new mongoose.Schema(
    {
      names:{
          type:String,
          required:true,
        },
        nationalId:{
        type:String,
        required:true,
        unique:true,
       
      },
        gender:{
        type:String,
        required:true,
      },
       missionStatement:{
        type:String,
        required:true,
      },
      profileUrl: {
        type: String,
    },
    nbrOfVotes: {
        type: Number,
        default: 0
    }
},
{
    timestamps:true
}
)
registerSchema('Candidate', candidateSchema, {orm: 'mongoose'});
const Candidate=mongoose.model("Candidate",candidateSchema)
export default Candidate;