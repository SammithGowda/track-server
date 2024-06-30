const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = new User({ email, password })
        await user.save()
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY")
        res.send({ token })
    } catch (error) {
        return res.status(422).send(error.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: "Must provide email and password !" })
    }

    const user = await User.findOne({ email }); //user info obj from mongo db

    if (!user) {
        return res.status(401).send({ error: "Invalid email or password !" })
    }

    try {
        await user.comparePassword(password); //if pass match
        // create token
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY")
        res.send({ token })


    } catch (error) {
        return res.status(401).send({ error: "Invalid email or password !" })
    }

})

module.exports = router;