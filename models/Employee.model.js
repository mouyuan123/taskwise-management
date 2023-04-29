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
const employeeSchema = new Schema({
    name: {
        type: String,
        require: false,
        default: '',
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: false,
        default: '',
    },
    profile: {
        type: Buffer,
        require: false,
        default: '',
    },
    joiningDate: {
        type: Date,
        require: false
    },
    firstLogin: {
        type: Boolean,
        default: true
    }
});

/*
 * "Pre-save" hook function => Automatically execute every time before ".save()" is executed
 * Before saving the current "Employee" object (this) into MongoDB, its password is hashed using "bcrypt"
 */
employeeSchema.pre("save", async function() {
    try {
        var user = this;
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(user.password, salt);
        user.password = hashPass;
    } catch (error) {
        throw error;
    }
});

// Define a custom method instance (employeeSchema.methods) to be used by every single "employeeSchema" object
// * Key => comparePassword, value => functions that implement the method
//! Using "arrow function" rather than "normal function" X work => "arrow function" X preserve the object from "this" keyword (object that invoke this function)
//! Hence, using "this.password" in "arrow function" will result in "undefined"
employeeSchema.methods.comparePassword = async function(userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

//* Create an "employee" collection which conforms to the "employeeSchema" in MongoDB
const employeeCollection = mongoose.model('employee', employeeSchema);

module.exports = employeeCollection;