const express = require("express")
const mongoose = require("mongoose")
const app = express();
const mongoUri = 'mongodb+srv://sammithdgowda:password-udemy@cluster0.p8gofmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoUri)

mongoose.connection.on("connected", () => {
    console.log("MongoDb connected successfully !")
})

mongoose.connection.on("error", (err) => {
    console.log("MongoDB Connection Error", err);
})

const port = 3001
app.get('/', (req, res) => {
    res.send("Hi There !")
})

app.listen(port, () => {
    console.log(`server listening ${port}`)
})