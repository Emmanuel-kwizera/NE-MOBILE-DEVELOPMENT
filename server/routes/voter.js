import Voter from "../Models/Voter.js";
import expres from "express"
import bcrypt from "bcryptjs"
import { isAuth, generateToken } from "../utils/verifyToken.js";
import { registerDefinition } from "swaggiffy";
import expressAsyncHandler from "express-async-handler"

const router = expres.Router();

//generetae function to register voter
router.post("/register", async (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hashed = bcrypt.hashSync(req.body.password, salt)
    const voter = new Voter({
        ...req.body,
        password: hashed
    })
    try {
        await voter.save();
        res.status(201).send(voter);
    } catch (error) {
        res.status(400).send(error);
    }
}
);

//generate login function for voter using email and phone number 
router.post("/login",
    expressAsyncHandler(async (req, res) => {

        const voter = await Voter.findOne({ email: req.body.email })
        if (voter) {
            if (bcrypt.compareSync(req.body.password, voter.password)) {
                res.send({
                    _id: voter._id,
                    names: voter.names,
                    address: voter.address,
                    phone: voter.phone,
                    nationalId: voter.nationalId,
                    email: voter.email,
                    token: generateToken(voter)
                })
                return
            }
        }
        res.status(401).send({ message: "Invalid email or password" })
    }))

//generate function to get all voters
router.get("/", isAuth, async (req, res) => {
    try {
        const voters = await Voter.find({});
        res.send(voters);
    } catch (error) {
        res.status(400).send(error);
    }
}
);


//generate function to delete voter using id
router.delete("/:id", isAuth, async (req, res) => {
    try {
        const voter = await Voter.findByIdAndDelete(req.params.id);
        res.send(voter);
    } catch (error) {
        res.status(400).send(error);
    }
}
);

//function to get voter using id
router.get("/:id", isAuth, async (req, res) => {
    try {
        const voter = await Voter.findById(req.params.id);
        res.send(voter);
    } catch (error) {
        res.status(400).send(error);
    }
}
);

//function to update voter using id
router.put("/:id", async (req, res) => {
    try {
        const voter = await Voter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(voter);
    } catch (error) {
        res.status(400).send(error);
    }
}
);


registerDefinition(router, { tags: 'Voters', mappedSchema: 'Voter', basePath: '/api/voters' })

export default router;
