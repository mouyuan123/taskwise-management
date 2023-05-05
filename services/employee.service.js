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

    static async getEmployeeInfo(_id) {
        try {
            const employee = await EmployeeModel.findById(_id);

            return employee;
        } catch (error) {
            throw error;
        }
    }

    static async updateEmployeeInfo(_id, employee) {
        try {
            const filter = {
                _id: _id
            }
            const update = {
                $set: {
                    firstLogin: false,
                }
            }
            if (employee.name != null && employee.name != "") {
                update['$set']['name'] = employee.name;
            }
            if (employee.password != null && employee.password != "") {
                update['$set']['password'] = employee.password;
            }
            if (employee.phone != null && employee.phone != "") {
                update['$set']['phone'] = employee.phone;
            }
            if (employee.profile != null && employee.profile != "") {
                update['$set']['profile'] = employee.profile;
            }

            // Check whether the "update" is done / not (Avoid updating if the field is empty)
            const result = (await EmployeeModel.updateOne(filter, update)).acknowledged;
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeService;