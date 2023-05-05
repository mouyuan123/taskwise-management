// All the API urls
//todo: Express Router => Define the endpoint of each HTTP method and the controller to handle the request-response
const router = require('express').Router();
const projectController = require('../controllers/project.controller');

router.post('/project/createProject', projectController.createProject);

module.exports = router;