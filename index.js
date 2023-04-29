//* Entry point to database
//* Import "app" object from 'app.js'
const app = require('./app');
//* Import "mongodb" object from 'db.js'
const mongodb = require('./config/db');
//* Import "employeeCollection" object from 'employee.model.js'
const employeeCollection = require('./models/Employee.model');

const port = 3000;

//* Start the server and listen to any incoming HTTP request on port 3000
app.listen(port, () => console.log(`Server listening on port: http://localhost:${port}`));

app.get('/', (req, res) => res.send("Fighting!!"));