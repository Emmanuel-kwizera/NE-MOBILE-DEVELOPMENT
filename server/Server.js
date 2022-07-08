import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import {Swaggiffy} from 'swaggiffy';
import cors from "cors"
const port=process.env.PORT || 5000
import AdminRoutes from "./routes/admin.js"
import VoterRoutes from "./routes/voter.js"
import CandidateRoutes from "./routes/candidate.js"

dotenv.config()
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to the database")
})
.catch(err=>{
    console.log(err.message)
})



const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",async(req,res)=>{
    res.status(201).send("Welcome to vehicle tracking system.")
})

app.use("/api/admins",AdminRoutes)
app.use("/api/voters",VoterRoutes)
app.use("/api/candidates",CandidateRoutes)




app.use((err,req,res,next)=>{
res.status(500).send({err:err.message})
})

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});

new Swaggiffy().setupExpress(app).swaggiffy();