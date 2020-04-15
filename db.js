const mongoose = require("mongoose")
const mongo_URI = `mongodb+srv://${process.env.MONGO_URI}`
mongoose
    .connect(mongo_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(function () {
        console.log("Mongo db cluster connected")
    }).catch(function (err) {
        console.log(err.message)
    })