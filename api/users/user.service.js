const { poolPromise, sql } = require("../../config/database");

module.exports = {
    create: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('User_Id', sql.NVarChar, data.userId)
            .input('Password', sql.NVarChar, data.password)
            .input('First_Name', sql.NVarChar, data.first_name)
            .input('Last_Name', sql.NVarChar, data.last_name)
            .input('Department', sql.NVarChar, data.department)
            .input('Level', sql.NVarChar, data.level)
            .input('Email', sql.NVarChar, data.email)
            .input('JDEcode', sql.NVarChar, data.jdeCode)
            .query(`insert into [USER] (userId, password, firstName, lastName, department, level, email, jdeCode)
              values(@User_Id,@Password,@First_Name,@Last_Name,@Department,@Level,@Email,@JDEcode)`
                ,
                (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    getUsers: async (callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .query(`SELECT id, userId, password, firstName, lastName, department, level, email, jdeCode 
                    FROM [USER] 
                    ORDER BY userId`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    
                    return callBack(null, results);
                }
            );
    },
    getUserById: async (id, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('Id', sql.Int, id)
            .query(`SELECT id, userId, password, firstName, lastName, department, level, email, jdeCode 
                    FROM [USER] 
                    WHERE id = @Id `  
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            );
    },
    updateUser: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('Id', sql.Int, data.id)
            .input('User_Id', sql.NVarChar, data.userId)
            .input('Password', sql.NVarChar, data.password)
            .input('First_Name', sql.NVarChar, data.first_name)
            .input('Last_Name', sql.NVarChar, data.last_name)
            .input('Department', sql.NVarChar, data.department)
            .input('Level', sql.NVarChar, data.level)
            .input('Email', sql.NVarChar, data.email)
            .input('JDEcode', sql.NVarChar, data.jdeCode)
            .query(`Update [USER] 
                        set userId = @User_Id, 
                            password = @Password, 
                            firstName = @First_Name, 
                            lastName = @Last_Name, 
                            department = @Department, 
                            level = @Level,
                            email = @Email, 
                            jdeCode = @JDEcode
                    where id = @Id `
                ,
                (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    deleteUser: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('Id', sql.Int, data.id)
            .query(`Delete [USER] where id = @Id `
                ,
                (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results);
                }
            );
    },
    getUserByEmail: async (email, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query(`SELECT id, userId, password, firstName, lastName, department, level, email, jdeCode 
                    FROM [USER] 
                    WHERE email = @Email `
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            );
    },
    getUserByUserId: async (userId, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('UserId', sql.NVarChar, userId)
            .query(`SELECT id, userId, password, firstName, lastName, department, level, email, jdeCode, [APPVERSION] 
                    FROM [USER] ,[APPVERSION]
                    WHERE userId = @UserId `
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            );
    },
}
