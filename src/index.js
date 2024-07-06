//below requires has to run once app server ran so this require part is import 
require("dotenv").config();
require("./modules/userModule")
require("./modules/trackModule")
const express = require("express")
const mongoose = require("mongoose")
const authRoute = require("./routes/authRoutes")
const trackRoute = require("./routes/trackRoutes")
const bodyParser = require("body-parser")
const authRequire = require("./middleware/requireAuth")
const app = express();
const port = 3001
const userName = process.env.MONGODB_USER
const password = process.env.MONGODB_PASS
const mongoUri = `mongodb+srv://${userName}:${password}-udemy@cluster0.p8gofmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

try {
    mongoose.connect(mongoUri)

    mongoose.connection.on("connected", () => {
    })

    mongoose.connection.on("error", (err) => {
    })
} catch (error) {
    return
}

app.use(bodyParser.json());
app.use(authRoute);
app.use(trackRoute);


app.get('/', authRequire, (req, res) => {
    res.send(`Wellcome to page ${req.user.email}`)
})

app.listen(port, () => {
    console.log(`server listening ${port}`)
})