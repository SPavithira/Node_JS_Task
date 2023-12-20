const sql = require("mssql");

var dbConfig = {
    "user": 'sa',
    "password": 'sa123',
    "server": 'localhost',
    "database": 'TaskDB',
    "trustServerCertificate": true,
};

module.exports = {
    sqlServerConnection: sql.connect(dbConfig)
} 