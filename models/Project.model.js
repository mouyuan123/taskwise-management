const mongoose = require('mongoose');

// Import "Schema" object from 'mongoose'
const { Schema } = mongoose;

// Create a new "Schema" object
/*
 * 1. Define structure of the collection in MongoDB
 * 2. Define the type of data stored within the collection
 */
const projectSchema = new Schema({
    // client: {
    //     require: true,

    // },
    name: {
        type: String,
        required: true,
    },
    due_date: {
        // Format: YYYY-MM--DD
        type: Date,
        required: true,
    },
    status: {
        //"In Progress", "Completed", "On Hold", and "Cancelled"
        type: String,
        required: true,
    },
    priority: {
        // "Low", "Medium", "High"
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // attachment: {
    //     require: false,
    // },
    // assignee: {
    //     type: String,
    //     require: true,
    // },
    // task: {
    //     require: false,
    // },
});

const projectCollection = mongoose.model('project', projectSchema);

module.exports = projectCollection;