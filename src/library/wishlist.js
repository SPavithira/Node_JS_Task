
const DBUtils = require('../../common/dbUtils');

module.exports = (ctx) => {
    return {
        wishListInsert: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    CustId, ProductId, Quantity
                } = ctx.request.body;

                let sqlquery = `INSERT INTO [dbo].[tb_WishList]([CustId],[ProductId],[Quantity],[IsActive],[CreatedOn],[ModifiedOn]) 
                                VALUES('${CustId}','${ProductId}','${Quantity}','${true}',GETDATE(),GETDATE());`

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

        wishListUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, Quantity, IsActive
                } = ctx.request.body;

                let pram = ""

                if (Quantity != undefined && Quantity != '')
                    pram = pram + ` Quantity = '${Quantity}'`
                else {
                    pram = pram + ` Quantity = null`
                }

                if (IsActive != undefined && IsActive != '')
                    pram = pram + `, IsActive = '${IsActive}'`
                else {
                    pram = pram + `, IsActive = '${false}'`
                }

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_WishList] SET ` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        wishListDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_WishList] SET IsActive = 0, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        getWishListById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[CustId],[ProductId],[Quantity],[IsActive],[CreatedOn],[ModifiedOn]
                                FROM [dbo].[tb_WishList] WHERE Id='${Id}' AND IsActive = 1`

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