// Handle requests from user && send response to user
const projectService = require('../services/project.service');

exports.createProject = async(req, res, next) => {
    try {
        const project = req.body;

        await projectService.createProject(project);

        res.status(200).json({
            status: true,
            message: 'Create a project successfully!'
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Something went wrong. Please try again later',
        })

        return next(new Error(error));
    }
}