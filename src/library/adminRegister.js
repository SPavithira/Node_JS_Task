
const DBUtils = require('../../common/dbUtils');

module.exports = (ctx) => {
    return {
        getUsersList: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    StartDate, EndDate
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[FirstName],[LastName],[EmailId],[Password],[PhoneNo],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn] FROM [dbo].[tb_Customers] WHERE IsActive = 1 AND IsDelete = 0`

                if (StartDate != undefined && StartDate != "" && EndDate != undefined && EndDate != "") {
                    sqlquery = sqlquery + `AND CreatedOn BETWEEN '${StartDate}' AND '${EndDate}'`
                }

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

        getRevenueList: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    StartDate, EndDate
                } = ctx.request.query;

                let sqlquery = `SELECT Orders.[Id] AS OrderId,Orders.[CustId],Orders.[OrderDate],Orders.[Amount],Orders.[DiscountAmount],Orders.[DeliveryCharge],Orders.[TotalAmount],Orders.[PaymentType],Orders.[Status] AS OrderStatus,
                                OrderDetails.Quantity AS ODQuantity, Products.ProductCode,Products.ProductDescription, Products.ProductImage, ShipDetails.Status As ShippingStatus
                                FROM [dbo].[tb_Orders] Orders INNER JOIN [dbo].[tb_OrderDetails] OrderDetails ON Orders.Id = OrderDetails.OrderId
                                INNER JOIN [dbo].[tb_Products] Products ON OrderDetails.ProductId = Products.Id
                                INNER JOIN [dbo].[tb_ShippingDetails] ShipDetails ON Orders.Id = ShipDetails.OrderId`

                if (StartDate != undefined && StartDate != "" && EndDate != undefined && EndDate != "") {
                    sqlquery = sqlquery + `AND CreatedOn BETWEEN '${StartDate}' AND '${EndDate}'`
                }

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

        adminInsert: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    AdminType, Permission, FirstName, LastName, EmailId, Password, PhoneNo
                } = ctx.request.body;

                let sqlquery = `INSERT INTO [dbo].[tb_Admintype]([AdminType],[Permissions],[CreatedOn],[ModifiedOn])
                                VALUES('${AdminType}','${Permission}',GETDATE(),GETDATE());
                                INSERT INTO [dbo].[tb_Admin]([FirstName],[LastName],[EmailId],[Password],[TypeId],[PhoneNo],[LastLogin],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn])
                                VALUES('${FirstName}','${LastName}','${EmailId}','${Password}','SCOPE_IDENTITY()','${PhoneNo}',GETDATE(),'${true}','${false}',GETDATE(),GETDATE());`

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

        adminUpdate: () => {

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

                let sqlquery = `UPDATE [dbo].[tb_Admin] SET` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        adminTypeUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, AdminType, Permission
                } = ctx.request.body;

                let pram = ""

                if (AdminType != undefined && AdminType != '')
                    pram = pram + ` AdminType = '${AdminType}'`

                if (Permission != undefined && Permission != '')
                    pram = pram + `, Permissions = '${Permission}'`

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_AdminType] SET` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        getAdminById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[FirstName],[LastName],[EmailId],[Password],[TypeId],[PhoneNo],[LastLogin],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn] FROM [dbo].[tb_Admin] WHERE Id = '${Id}'`

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

        getAdminTypeById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[AdminType],[Permissions],[CreatedOn],[ModifiedOn] FROM [dbo].[tb_Admintype] WHERE Id = '${Id}'`

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

        adminDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_Admin] SET IsDelete = 1, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        adminTypeDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_AdminType] SET IsDelete = 1, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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