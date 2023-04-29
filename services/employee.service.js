// CRUD of "Employee" to MongoDB
const EmployeeModel = require("../models/Employee.model");
const jwt = require("jsonwebtoken");

class EmployeeService {

    static async registerEmployee(email, password) {
        try {
            const createEmployee = new EmployeeModel({ email, password });

            return await createEmployee.save();
        } catch (error) {
            throw error;
        }
    }

    //* "static" => Available to the single "Employee" model, not the single instance / document of "Employee"
    //* With "static", we can access the entire "Employee" model to find an "employee" document with the specific email
    static async checkUser(email) {
        try {
            // Return the emloyee with "email"
            return await EmployeeModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }

    // static async getEmployeeInfo(employee) {
    //     try{
    //         return await EmployeeModel.findById(userId);
    //     }catch(error){
    //         throw error;
    //     }
    // }

    static async updateEmployeeInfo(_id, employee) {
        try {
            const filter = {
                _id: _id
            }
            const update = {
                    $set: {
                        name: employee.name,
                        password: employee.password,
                        phone: employee.phone,
                        profile: employee.profile,
                        firstLogin: false,
                    }
                }
                // Check whether the "update" is done / not
            const result = (await EmployeeModel.updateOne(filter, update)).acknowledged;
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeService;