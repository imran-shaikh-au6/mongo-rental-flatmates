const User = require("../../model/user.js")
let cloudinary = require("cloudinary")
let multiparty = require("multiparty")
const jwt = require("jsonwebtoken");
const Property = require("../../model/property")
const smtpTransport = require("nodemailer-smtp-transport");
const nodemailer = require("nodemailer")
module.exports = {
    register: async (req, res) => {
        const email = req.body.email
        const emailFound = await User.findOne({
            email: email
        })
        if (emailFound) {
            return res.send("You are already registered. try to login")
        }
        const user = new User({
            ...req.body
        });
        jwt.sign({
            user: user
        }, "secret key", (err, token) => {
            user.token = token;
            user.save()
                .then(function (user) {
                    res.json({
                        message: "Registered successfully. You can log in now",
                        user: user
                    });
                })
                .catch(function (err) {
                    console.log(err);
                    if (err.name === "ValidationError")
                        return res
                            .status(400)
                            .send(`Validation Error: ${err.message}`);
                });
        });
    },
    login: async (req, res) => {
        const body = req.body;
        const email = body.email;
        const password = body.password;
        if (!email || !password) return res.send("Invalid Creadiantials");
        try {
            const user = await User.userFind(email, password);
            if (user) {
                jwt.sign({
                        id: user._id
                    },
                    "secret key", {
                        expiresIn: 60 * 60 * 1
                    },
                    (err, token) => {
                        User.updateOne({
                            email: email
                        }, {
                            $set: {
                                token: token
                            }
                        }).then(
                            function (us) {
                                User.find({
                                    email: email
                                }).then(function (user) {
                                    res.json({
                                        message: "Logged in successfully",
                                        token: token
                                    });
                                });
                            }
                        );
                    }
                );
            }
        } catch (err) {
            console.log(err);
            res.send(err.message);
        }
    },
    logout: (req, res) => {
        const user = req.user;
        User.findOneAndUpdate({
                _id: user._id
            }, {
                $set: {
                    token: null
                }
            })
            .then(function (user) {
                res.json({
                    message: "logged Out Successfully!! Visit Us Again",
                    status: 200,

                });
            })
            .catch(function (err) {
                res.send(err);
            });
    },
    addProperty: (req, res) => {
        const form = new multiparty.Form({
            uploadDir: "uploads"
        });
        form.parse(req, function (err, fields, files) {
            const property_title = fields.property_title[0]
            const property_rent = fields.property_rent[0]
            const proprty_deposit = fields.proprty_deposit[0]
            const property_type = fields.property_type[0]
            const property_type_gender = fields.property_type_gender[0]
            const property_amenities = fields.property_amenities[0]
            const property_location = fields.property_location[0]
            const propert_possesion = fields.propert_possesion[0]
            const property_area = fields.property_area[0]
            const property_furnish = fields.property_furnish[0]
            const property_address = fields.property_address[0]
            const img = files.property_img[0].path
            cloudinary.uploader.upload(img, function (result, error) {
                if (error) {
                    console.log(error)
                }
                const user = req.user
                User.findById(user._id).then(function (user) {
                    const property = new Property({
                        property_title: property_title,
                        property_rent: property_rent,
                        proprty_deposit: proprty_deposit,
                        property_type: property_type,
                        property_type_gender: property_type_gender,
                        property_amenities: property_amenities,
                        property_location: property_location,
                        propert_possesion: propert_possesion,
                        property_area: property_area,
                        property_furnish: property_furnish,
                        property_address: property_address
                    })
                    property.property_img = result.secure_url;
                    property.user = user;
                    property.save().then(function (data) {
                        res.json({
                            message: "Property Added successfully",
                            property: data
                        })
                    }).catch(function (err) {
                        console.log(err.message)
                    })
                }).catch(function (err) {
                    console.log(err.message)
                })
            });
        });
    },
    userMyfav: async (req, res) => {
        const id = req.params.property_id;
        const user = req.user;
        const property = await Property.findById(id);
        try {
            const user1 = await User.updateOne({
                _id: user._id
            }, {
                $push: {
                    favourite: property
                }
            });
            const data = User.findById(user._id)
            res.json({
                message: "Property Added to your Favourite list!!You can Get owner details also",
                property: property
            });

        } catch (err) {
            res.status(500).send("server error")
            console.log(err.massage)
        }
    },
    userEmailDetails: async (req, res) => {
        const user1 = req.user;
        const userid = user1.id;
        const user1id = await User.findById(userid)
        const userName = user1id.name;
        const userEMAIL = user1id.email
        const id = req.params.property_id
        const property = await Property.findById(id)
        const name = property.property_title;
        const location = property.property_location;
        const ownerid = property.user;
        const owner = await User.findById(ownerid);
        const owner_name = owner.name;
        const owner_eamil = owner.email;
        const owner_phone = owner.phone_number;
        var transport = nodemailer.createTransport(
            smtpTransport({
                service: "Gmail",
                // debug : process.env.NODE_ENV === "development" ,
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "guravsneha258@gmail.com",
                    pass: "vlqgurytisbpixrg",
                },
            })
        );
        const mailoptions = {
            from: "guravsneha258@gmail.com",
            to: userEMAIL,
            subject: "Property Owner details by RentalFlatmates",
            text: `" Hi ${userName},
     You have requested for the property ${name} and location ${location} ,the owner details are given below name:
    owner name: ${owner_name}, owner-email address: ${owner_eamil}, owner phone-number:${owner_phone}"`
        };
        transport.sendMail(mailoptions, function (err, data) {
            if (err) {
                console.log(err);

            } else {
                console.log("sent mail");
                res.json("Owner details for this Property has been sent to your email-address, Please check your Inbox.")
            }
        });
    }
}