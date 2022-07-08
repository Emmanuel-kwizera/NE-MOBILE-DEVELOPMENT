import express from "express"
const router = express.Router();
import Candidate from "../Models/Candidate.js"
import { isAuth } from "../utils/verifyToken.js";
import { registerDefinition } from "swaggiffy"

//generate function to get all candidates
router.get("/", isAuth, async (req, res) => {
    try {
        const candidates = await Candidate.find({});
        res.send(candidates);
    } catch (error) {
        res.status(400).send(error);
    }
}
);



//generate function to get candidate using id
router.get("/:id", isAuth, async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        res.send(candidate);
    } catch (error) {
        res.status(400).send(error);
    }
}
);



//generate function to delete candidate using id
router.delete("/:id", isAuth, async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        res.send(candidate);
    } catch (error) {
        res.status(400).send(error);
    }
}
);



//generate funcrion to update candidate using id on vote

router.put('/vote/:_id', async (req, res) => {
    try {
        const candidateFound = await Candidate.findOne({
            _id: req.params.id
        })

        var nbrOfVotes = candidateFound.nbrOfVotes + 1;

        const candidate = await Candidate.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    nbrOfVotes: nbrOfVotes,
                }
            }
        )

        if (!candidate) {
            return res.status(400).send({
                status: '400 Bad Request',
                message: 'Candidate Not Found - Update Failed',
            })
        }

        return res.status(200).send({
            status: '200',
            message: 'Candidate voted successfully',
            data: candidate
        })

    } catch (err) {
        res.status(500).json({
            status: 'Error Occured',
            message: err
        })
    }
})


//grenerate function to create candidate
router.post("/register", isAuth, async (req, res) => {
    const candidate = new Candidate({
        names: req.body.names,
        nationalId: req.body.nationalId,
        gender: req.body.gender,
        missionStatement: req.body.missionStatement,
        profileUrl: req.body.profileUrl,
        nbrOfVotes: req.body.nbrOfVotes
    });
    try {
        await candidate.save();
        res.send(candidate);
    } catch (error) {
        res.status(400).send(error);
    }
}
);


registerDefinition(router, { tags: 'Candidates', mappedSchema: 'Candidate', basePath: '/api/candidates' })
export default router;


