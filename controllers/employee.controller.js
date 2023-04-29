// Handle requests from user && send response to user
const employeeService = require('../services/employee.service');
const bcrypt = require('bcrypt');
// const helperFunction = require('');

exports.register = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        // Avoid storing two employees with "same" email
        if (await employeeService.checkUser(email) != null) {
            res.status(400).json({
                status: false,
                message: "Email exists, please try again!"
            });
            return next(new Error("Email does exist"));
        }

        await employeeService.registerEmployee(email, password);

        res.status(200).json({ status: true, message: "Register successfully!" });
    } catch (error) {
        throw error;
    }
}

exports.login = async(req, res, next) => {
    try {

        const { email, password } = req.body;

        const employee = await employeeService.checkUser(email);

        if (!employee) {
            res.status(400).json({
                    status: false,
                    message: "User doesn't exist!"
                })
                // Safely return error to avoid terminating the server
            return next(new Error("User doesn't exist!"));
        }

        const isMatch = await employee.comparePassword(password);

        if (!isMatch) {
            res.status(400).json({
                status: false,
                message: "Invalid password"
            })
            return next(new Error("Invalid password"));
        }

        let tokenData = { _id: employee._id, email: employee.email };

        const jwtToken = await employeeService.generateToken(tokenData, "secretKey", "1h");

        res.status(200).json({
            status: true,
            token: jwtToken,
            firstLogin: employee.firstLogin,
            message: 'You have logged in successfully!',
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something wrong happens, please try again later"
        })
        return next(error);
    }
}

exports.updateEmployee = async(req, res, next) => {
    try {
        console.log("run le run le ma?");
        const employee = req.body;
        console.log(employee);

        const _id = req.params.id;

        console.log(_id);

        const salt = await bcrypt.genSalt(10);

        employee.password = await bcrypt.hash(employee.password, salt);

        // Convert Base64encoding to Buffer to be stored
        if (employee.profile != null) {
            employee.profile = Buffer.from(employee.profile, 'base64');
        }

        const result = await employeeService.updateEmployeeInfo(_id, employee);
        console.log(result);

        if (result) {
            res.status(200).json({
                status: true,
                message: 'You\'ve updated your information successfully'
            });
        } else {
            res.status(404).json({
                status: false,
                message: 'Something wrong happens'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
        return next(error);
    }
}

exports.getInfo = async(req, res, next) => {
    try {
        const email = req.query.email;
        const employee = await employeeService.checkUser(email);

        res.status(200).json({
            status: true,
            email: email,
            name: employee.name,
            phone: employee.phone,
            profile: employee.profile,
            firstLogin: employee.firstLogin
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something wrong happens, please try again later"
        })
        return next(error);
    }
}