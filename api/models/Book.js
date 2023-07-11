const mongoose = require("mongoose");
const User = require("../models/User");


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },

    username: {
        type: String,
        required: true,

    }

},{timestamps:true});

module.exports = mongoose.model("Book", BookSchema);
