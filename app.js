//* Importing neccessary packages
const express = require('express');
const cors = require('cors');
// Assemble the request data into easily accessible JSON format
const body_parser = require('body-parser');
// Register necessary API Urls
const employeeRouter = require('./routes/employee.route');
const projectRouter = require('./routes/project.route');

//* Create an 'Express' object and assign to "app"
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(body_parser.json({ limit: '50mb' }));
app.use('/', employeeRouter);
app.use('/', projectRouter);

//* "Object" to be returned when "required()" is invoked
module.exports = app;