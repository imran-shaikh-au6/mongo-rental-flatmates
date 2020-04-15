const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
        property_title: {
            type: String,
            required: true
        },
        property_img: [{
            type: String,
            required: true
        }],
        property_rent: {
            type: Number,
            required: true
        },
        proprty_deposit: {
            type: String,
            required: true
        },
        property_type: {
            type: String,
            required: true
        },
        property_type_gender: {
            type: String,
            required: true
        },
        property_amenities: {
            type: String,
            required: true
        },
        property_location: {
            type: String,
            required: true
        },
        propert_possesion: {
            type: String,
            required: true
        },
        property_address: {
            type: String,
            required: true
        },
        property_area: {
            type: String,
            required: true
        },
        property_furnish: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user"
        }

    },

    {
        timestamps: true
    }
);

const Property = mongoose.model("property", propertySchema);

module.exports = Property;