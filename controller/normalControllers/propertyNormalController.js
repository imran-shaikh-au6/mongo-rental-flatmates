const Property = require("../../model/property")
module.exports = {
    getProperty: async (req, res) => {
        try {
            const properties = await Property.find();
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
        } catch (error) {
            res.send("server error");
            console.log(err.massage);
        }
    },
    getProprtyDetailsById: async (req, res) => {
        const detail = req.params.property_id
        const property = [];
        try {
            const propertyDetails = await Property.findById(detail)
            const propertys = {
                property_title: propertyDetails.property_title,
                property_img: propertyDetails.property_img,
                property_rent: propertyDetails.property_rent,
                property_deposit: propertyDetails.proprty_deposit,
                property_loction: propertyDetails.property_location,
                property_amenities: propertyDetails.property_amenities,
                propert_possesion: propertyDetails.propert_possesion,
                property_address: propertyDetails.property_address,
                property_area: propertyDetails.property_area,
                property_furnish: propertyDetails.property_furnish,
                "To get details of owner for this property  use  this id": propertyDetails.user,
            };
            property.push(propertys);
            res.status(200).json(property);
        } catch (err) {
            res.status(500).send("server error")
            console.log(err.massage)
        }
    }
};