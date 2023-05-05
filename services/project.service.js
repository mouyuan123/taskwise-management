// CRUD of "Project" to MongoDB
const ProjectModel = require("../models/Project.model");

class ProjectService {

    // Create a project => .create() will invoke the save() directly once the creation is done
    static async createProject(project) {
        try {
            return await ProjectModel.create({
                name: project.name,
                due_date: project.due_date,
                status: project.status,
                priority: project.priority,
                description: project.description
            })
        } catch (error) {
            throw error;
        }
    }

    // static async updateProject(project) {
    //     try{

    //     }catch(error){
    //         throw error;
    //     }
    // }
}

module.exports = ProjectService;