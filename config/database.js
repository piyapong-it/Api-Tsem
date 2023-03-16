const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_SQLDB,
    requestTimeout: 300000,
    "options": {
        "encrypt": true,
        "enableArithAbort": true
        }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    }).catch(err => console.log('Database connection failed ! Bad config: ', err))

module.exports = {sql,poolPromise}