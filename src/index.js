//below requires has to run once app server ran so this require part is import 
require("./modules/userModule")
require("./modules/trackModule")
const express = require("express")
const mongoose = require("mongoose")
const authRoute = require("./routes/authRoutes")
const tarkRoute = require("./routes/trackRoutes")
const bodyParser = require("body-parser")
const authRequire = require("./middleware/requireAuth")
const app = express();
const port = 3001
const mongoUri = 'mongodb+srv://sammithdgowda:password-udemy@cluster0.p8gofmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoUri)

mongoose.connection.on("connected", () => {
    console.log("MongoDb connected successfully !")
})

mongoose.connection.on("error", (err) => {
    console.log("MongoDB Connection Error", err);
})

app.use(bodyParser.json());
app.use(authRoute);
app.use(tarkRoute);


app.get('/', authRequire, (req, res) => {
    res.send(`Wellcome to page ${req.user.email}`)
})

app.listen(port, () => {
    console.log(`server listening ${port}`)
})