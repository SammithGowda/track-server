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

module.exports = router
