// All the API urls
//todo: Express Router => Define the endpoint of each HTTP method and the controller to handle the request-response
const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.post('/register', employeeController.register);
//* When an user send request to "/login" endpoint, employeeController.login is used to handle its request-response
router.post('/login', employeeController.login);
router.get('/info', employeeController.getInfo);
router.put('/update/:id', employeeController.updateEmployee);

module.exports = router;