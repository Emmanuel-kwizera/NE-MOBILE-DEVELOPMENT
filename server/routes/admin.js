import express from "express"
import bcrypt from "bcryptjs"
import expressAsyncHandler from "express-async-handler"
import { registerDefinition } from "swaggiffy"
const router = express.Router();
import { isAuth, generateToken, } from "../utils/verifyToken.js";
import Admin from "../Models/Admin.js"

router.post("/register", async (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hashed = bcrypt.hashSync(req.body.password, salt)
    const admin = new Admin({
        ...req.body,
        password: hashed
    })
    try {
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
}
);


//generate login function for admin using email and phone number 
router.post("/login",
    expressAsyncHandler(async (req, res) => {

        const admin = await Admin.findOne({ email: req.body.email })
        if (admin) {
            if (bcrypt.compareSync(req.body.password, admin.password)) {
                res.send({
                    _id: admin._id,
                    names: admin.names,
                    address: admin.address,
                    phone: admin.phone,
                    nationalId: admin.nationalId,
                    email: admin.email,
                    isAdmin: admin.isAdmin,
                    token: generateToken(admin)
                })
                return
            }
        }
        res.status(401).send({ message: "Invalid email or password" })
    }))

router.get("/", isAuth, async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.send(admins);
    } catch (error) {
        res.status(400).send(error);
    }
}
);

//generate function to delete admin using id
router.delete("/:id", isAuth, async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        res.send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
}
);

//GENERATE FUNCTION TO UPDATE admin UDING admin ID
router.put("/:id", isAuth, async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
}
);

//GENERATE FUNCTION TO GET admin BY ID 
router.get("/:id", isAuth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
}
);

registerDefinition(router, { tags: 'Admins', mappedSchema: 'Admin', basePath: '/api/admins' })

export default router;
