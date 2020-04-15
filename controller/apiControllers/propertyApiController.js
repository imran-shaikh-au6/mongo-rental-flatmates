const Property = require("../../model/property")

module.exports = {
    propertyFilters: async (req, res) => {
        const location = req.params.location.toLowerCase();
        const location1 = location.slice(9);
        const type = req.params.type.toUpperCase();
        const type2 = type.slice(5);
        const gender = req.params.gender.toLowerCase();
        const gender1 = gender.slice(7);
        const rent = req.params.rent;
        const rent1 = Number(rent.slice(5));
        try {
            const data = await Property.find({
                $or: [{
                        property_type: {
                            $in: type2
                        },
                    },
                    {
                        property_location: {
                            $in: location1
                        },
                    },
                    {
                        property_type_gender: {
                            $in: gender1
                        },
                    },
                    {
                        property_rent: {
                            $lt: rent1
                        },
                    },
                ],
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(500).send("server error")
            console.log(err.massage)
        }

    },
    updatePropertById: async (req, res) => {
        const user = req.user;
        const property_id = req.params.property_id
        try {
            const property = await Property.updateOne({
                user: user._id,
                _id: property_id
            }, {
                $set: {
                    _id: req.body._id,
                    property_title: req.body.property_title,
                    property_img: req.body.property_img,
                    property_rent: req.body.property_rent,
                    proprty_deposit: req.body.proprty_deposit,
                    property_type: req.body.property_type,
                    property_type_gender: req.body.property_type_gender,
                    property_amenities: req.body.property_amenities,
                    property_location: req.body.property_location,
                    propert_possesion: req.body.propert_possesion,
                    property_address: req.body.property_address,
                    property_area: req.body.property_area,
                    property_furnish: req.body.property_furnish
                }
            })
            if (property == null) {
                res.status(403).send("You are not allowed to delete this property")
            } else {
                res.status(200).json({
                    massage: "Property updated successfully",
                    Property: property
                })
            }
        } catch (err) {
            res.status(500).send("server error")
            console.log(err.massage)
        }
    },
    deletePropertyByID: async (req, res) => {
        const user = req.user;
        const property_id = req.params.property_id
        try {
            const property = await Property.findOneAndDelete({
                user: user._id,
                _id: property_id
            })
            if (property == null) {
                res.status(403).send("You are not allowed to delete this property")
            } else {
                res.status(200).json({
                    massage: "Property deleted successfully",
                    Property: property
                })
            }
        } catch (err) {
            res.status(500).send("server error")
            console.log(err.massage)
        }
    }
}