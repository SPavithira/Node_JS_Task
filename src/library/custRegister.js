
const DBUtils = require('../../common/dbUtils');

module.exports = (ctx) => {
    return {
        customersInsert: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    FirstName, LastName, EmailId, Password, PhoneNo
                } = ctx.request.body;

                let sqlquery = `INSERT INTO [dbo].[tb_Customers]([FirstName],[LastName],[EmailId],[Password],[PhoneNo],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn])
                                VALUES('${FirstName}','${LastName}','${EmailId}','${Password}','${PhoneNo}','${true}','${false}',GETDATE(),GETDATE());`

                try {

                    (await DBUtils.sqlServerConnection).request().query(sqlquery, function (error, results) {
                        if (results) {
                            resolve(results);
                        }
                        else {
                            console.log(error);
                        }
                    });

                }
                catch (err) {
                    reject(err);
                }

            })

        },

        customersUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, FirstName, LastName, EmailId, Password, PhoneNo, IsActive
                } = ctx.request.body;

                let pram = ""

                if (FirstName != undefined && FirstName != '')
                    pram = pram + ` FirstName = '${FirstName}'`

                if (LastName != undefined && LastName != '')
                    pram = pram + `, LastName = '${LastName}'`

                if (EmailId != undefined && EmailId != '')
                    pram = pram + `, EmailId = '${EmailId}'`

                if (Password != undefined && Password != '')
                    pram = pram + `, Password = '${Password}'`

                if (PhoneNo != undefined && PhoneNo != '')
                    pram = pram + `, PhoneNo = '${PhoneNo}'`

                if (IsActive != undefined && IsActive != '')
                    pram = pram + `, IsActive = '${IsActive}'`

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_Customers] SET` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

                try {

                    (await DBUtils.sqlServerConnection).request().query(sqlquery, function (error, results) {
                        if (results) {
                            resolve(results);
                        }
                        else {
                            console.log(error);
                        }
                    });

                }
                catch (err) {
                    reject(err);
                }

            })
        },

        customersDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_Customers] SET IsDelete = 1, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

                try {

                    (await DBUtils.sqlServerConnection).request().query(sqlquery, function (error, results) {
                        if (results) {
                            resolve(results);
                        }
                        else {
                            console.log(error);
                        }
                    });

                }
                catch (err) {
                    reject(err);
                }

            })
        },

        getCustomerById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[FirstName],[LastName],[EmailId],[Password],[PhoneNo],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn] FROM [dbo].[tb_Customers] WHERE Id = '${Id}'`

                try {

                    (await DBUtils.sqlServerConnection).request().query(sqlquery, function (error, results) {
                        if (results) {
                            resolve(results);
                        }
                        else {
                            console.log(error);
                        }
                    });

                }
                catch (err) {
                    reject(err);
                }

            })
        }
    }
}