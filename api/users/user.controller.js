const { 
    create, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser,
    getUserByEmail,
    getUserByUserId
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            return res.status(200).send(JSON.stringify({ success: true, message: "Inserted successfully",result:[] }));
        });
    },
    getUserById:(req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: false, message: "Record not found" }));
            }
            return  res.send(JSON.stringify({ success: true, result: results.recordset }));
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            return  res.status(200).send(JSON.stringify({ success: true, result: results.recordset }));
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: false, message: "Record not found",result:[] }));
            }
            return res.status(200).send(JSON.stringify({ success: true, message: "Updated successfully",result:[] }));
        });
    },
    deleteUser: (req, res) => {
        const body = req.body;
        deleteUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: false, message: "Record not found",result:[] }));
            }
            return res.status(200).send(JSON.stringify({ success: false, message: "Deleted successfully",result:[] }));
        });
    },
    getUserByUserId:(req, res) => {
        const userId = req.params.userId;
        
        getUserByUserId(userId, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: false, message: "Record not found" }));
            }
            return  res.send(JSON.stringify({ success: true, result: results.recordset }));
        });
    },
    login: (req, res) => {
        const body = req.body;
        console.log('api login')
        getUserByUserId(body.userId, (err, results) => {
            if (err) {
                //console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: false, message: "Invalid user id or password" }));
            }
            
            // console.log("results ",results);
            // console.log("results.password ",results.recordset[0].password);
            const result = compareSync(body.password, results.recordset[0].password);
            if (result) {
                results.recordset[0].password = undefined;
                const jsontoken = sign({result: results}, process.env.TOKEN_KEYID,{
                    expiresIn: "1d"
                });
                // console.log(result)
                return res.status(200).send(JSON.stringify({ 
                    success: true, 
                    message: "login successfully", 
                    firstName: results.recordset[0].firstName,
                    lastName: results.recordset[0].lastName,
                    department: results.recordset[0].department,
                    level: results.recordset[0].level,
                    email: results.recordset[0].email,
                    jdeCode: results.recordset[0].jdeCode,
                    appVersion: results.recordset[0].APPVERSION,
                    token: jsontoken 
                }));
            } else {
                return res.status(200).send(JSON.stringify({ success: false, message: "Invalid email or password" }));
            }
        });
    },

}