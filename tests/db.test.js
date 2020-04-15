// process.env.NODE_ENV = "test";
const db = require("../db")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
var fetch = require("node-fetch")
const User = require("../model/user")
const databaseName = "test";
const users = {
    name: "imran",
    email: "test@gmail.com",
    password: "1",
    phone_number: "1234567890",
    favourite: []
}
describe("user register", function () {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1:27017/${databaseName}`;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    test("register a new user", function (done) {
        jwt.sign({
            user: users
        }, "secret key", (err, token) => {
            users.token = token
            User.create(users).then(function (data) {
                console.log(data)
                expect(data).toBeDefined()
                done()
            }).catch(function (err) {
                done(err.message)
            })
        })
    })
    test("all properties listed test", async (done) => {
        jest.setTimeout(4000)
        const data = await fetch("https://project-app-trial.herokuapp.com/property")
        const json = await (data.json())
        console.log(json)
        done()
    })
    afterAll(function () {
        db.disconnect()
    })
})