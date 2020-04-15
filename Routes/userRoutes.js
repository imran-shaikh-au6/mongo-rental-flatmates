const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
    register,
    login,
    logout,
    addProperty,
    userMyfav,
    userEmailDetails
} = require("../controller/apiControllers/userApiController")
const {

    userMyListing,
    userMyFavs
} = require("../controller/normalControllers/userNoramlController")

//all post routes of user are in apiController

//user register route
router.post("/user/register", register)

//user login route
router.post("/user/login", login)

//user logout route
router.delete("/user/logout", auth, logout);

//user property add route
router.post("/user/addproperty", auth, addProperty)

//user myFav property route
router.post("/user/profile/addmyfav/:property_id", auth, userMyfav)

//user owner details EMAIL route
router.post("/owner-details/:property_id", auth, userEmailDetails)

//***********// 
//all get routes of user are in normalApiController
//user posted property details (his/her own property)
router.get("/user/profile/mylisting", auth, userMyListing)

//user added to favourite list properties
router.get("/user/profile/myfav", auth, userMyFavs)


module.exports = router;