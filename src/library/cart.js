
const DBUtils = require('../../common/dbUtils');

module.exports = (ctx) => {
    return {
        cartInsert: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    CustId, ProductId, Quantity, Amount
                } = ctx.request.body;

                let sqlquery = `INSERT INTO [dbo].[tb_Cart]([CustId],[ProductId],[Quantity],[Amount],[IsActive],[CreatedOn],[ModifiedOn]) 
                                VALUES('${CustId}','${ProductId}','${Quantity}','${Amount}','${true}',GETDATE(),GETDATE());`

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

        cartUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, Quantity, Amount, IsActive
                } = ctx.request.body;

                let pram = ""

                if (Quantity != undefined && Quantity != '')
                    pram = pram + ` Quantity = '${Quantity}'`
                else {
                    pram = pram + ` Quantity = null`
                }

                if (Amount != undefined && Amount != '')
                    pram = pram + `, Amount = '${Amount}'`
                else {
                    pram = pram + `, Amount = null`
                }

                if (IsActive != undefined && IsActive != '')
                    pram = pram + `, IsActive = '${IsActive}'`
                else {
                    pram = pram + `, IsActive = '${false}'`
                }

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_Cart] SET ` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        cartDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_Cart] SET IsActive = 0, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        getCartById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[CustId],[ProductId],[Quantity],[Amount],[IsActive],[CreatedOn],[ModifiedOn]
                                FROM [dbo].[tb_Cart] WHERE Id='${Id}' AND IsActive = 1`

                try {

                    (await DBUtils.sqlServerConnection).request().query(sqlquery, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset);
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