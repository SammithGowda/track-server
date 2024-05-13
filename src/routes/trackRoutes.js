const express = require("express")
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const Track = mongoose.model("Track")
const router = express.Router();

router.use(requireAuth)// every router has to pass this middleware auth to get end point

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id })

    return res.send({ tracks })
})

router.post('/track', async (req, res) => {
    const { name, location } = req.body;
    // console.log(req)

    if (!name || !location) {
        return res.status(401).send({ error: "Please provide name and location !" })
    }

    try {
        const track = new Track({ name, location, userId: req.user._id })
        await track.save();
        res.status(201).send(track)
    } catch (error) {
        return res.status(402).send({ error: `error while creating ${error}` })
    }
})

module.exports = router
