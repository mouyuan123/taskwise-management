const mongoose = require('mongoose');
const mongodb = require('../config/db');
const bcrypt = require('bcrypt');

// Import "Schema" object from 'mongoose'
const { Schema } = mongoose;

// Create a new "Schema" object
/*
 * 1. Define structure of the collection in MongoDB
 * 2. Define the type of data stored within the collection
 */
const engineerSchema = new Schema({
    age: {
        type: Number,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    marital: {
        type: String,
        required: true,
    },
    cgpa: {
        type: String,
        required: true,
    },
    yearOfExperience: {
        type: Number,
        required: true,
    },
});

/*
 * "Pre-save" hook function => Automatically execute every time before ".save()" is executed
 * Before saving the current "Employee" object (this) into MongoDB, its password is hashed using "bcrypt"
 */
engineerSchema.pre("save", async function() {
    try {
        var user = this;
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(user.password, salt);
        user.password = hashPass;
    } catch (error) {
        throw error;
    }
});

//* Create an "engineer" collection which conforms to the "engineerSchema" in MongoDB
const engineerCollection = mongoose.model('engineer', engineerSchema);

module.exports = engineerCollection;