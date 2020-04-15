const Property = require("../../model/property")
const User = require("../../model/user")

module.exports = {
    userMyListing: async (req, res) => {
        const user = req.user;
        console.log(user);
        try {
            const properties = await Property.find({
                user: user._id
            });
            const propertyArray = [];
            for (i = 0; i < properties.length; i++) {
                const propertys = {
                    property_title: properties[i].property_title,
                    property_img: properties[i].property_img,
                    property_rent: properties[i].property_rent,
                    property_deposit: properties[i].proprty_deposit,
                    property_loction: properties[i].property_location,
                    "To get property details use property id": properties[i]._id,
                };
                propertyArray.push(propertys);
            }
            res.json(propertyArray);
        } catch (err) {
            res.status(500).send("server error");
            console.log(err.massage);
        }
    },
    userMyFavs: async (req, res) => {
        const user = req.user
        const favourite = user.favourite
        const arr = []
        for (i = 0; i < favourite.length; i++) {
            var properties = await Property.find(favourite[i]);
            arr.push(properties)
        }
        res.json(arr)
    }
}