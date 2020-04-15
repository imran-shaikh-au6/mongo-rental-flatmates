const express = require("express");
const auth = require("../middleware/auth")
const Property = require("../model/property");
const {
    propertyFilters,
    updatePropertById,
    deletePropertyByID
} = require("../controller/apiControllers/propertyApiController")

const {
    getProperty,
    getProprtyDetailsById
} = require("../controller/normalControllers/propertyNormalController")
const router = express.Router();

//property filters
router.get("/property/filter/:location/:type/:gender/:rent", propertyFilters);

//update property details by id
router.patch("/property/update/:property_id", auth, updatePropertById)

//delete property by id
router.delete("/property/delete/:property_id", auth, deletePropertyByID)

//get all property route
router.get("/property", getProperty);

//get particular property details by id
router.get("/property/detail/:property_id", getProprtyDetailsById)


module.exports = router;