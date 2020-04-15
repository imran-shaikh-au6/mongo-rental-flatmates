const express = require("express");
require("dotenv").config()
//imported cloudinary
require("./utils/cloudinary")
//cluster db connected 
require("./db")

//all property routes
const propertyRoutes = require("./Routes/propertyRoutes");
//all user routes
const userRutes = require("./Routes/userRoutes");
const app = express();
app.use(express.json());
app.use(express.static("uploads"))
app.use(express.urlencoded({
    extended: true
}));
//to get response on heroku hello written
app.get("/", (req, res) => {
    res.send("hello");
});
app.use(propertyRoutes);
app.use(userRutes);

module.exports = app