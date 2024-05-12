const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const User = mongoose.model("User")

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        console.log("no auth")
        return res.status(401).send({ error: "Please login first" })
    }
    const jwtToken = authorization.replace('Bearer ', '')
    jwt.verify(jwtToken, "MY_SECRET_KEY", async (err, paylod) => {
        if (err) {
            console.log("jwt pass after")
            return res.status(401).send({ error: "Please login first" })
        }
        const { userId } = paylod;
        const user = await User.findById(userId);
        req.user = user
        next();
    })
}