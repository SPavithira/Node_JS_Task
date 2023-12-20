const DBUtils = require('../../common/dbUtils');

module.exports = (ctx) => {
    return {
        ordersInsert: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    CustId, Amount, DiscountAmount, DeliveryCharge, TotalAmount, PaymentType, OrderStatus
                } = ctx.request.body;

                let sqlquery = `INSERT INTO [dbo].[tb_Orders]([CustId],[OrderDate],[Amount],[DiscountAmount],[DeliveryCharge],[TotalAmount],[PaymentType],[Status],[CreatedOn],[ModifiedOn])
                VALUES ('${CustId}',GETDATE(),'${Amount}','${DiscountAmount}','${DeliveryCharge}','${TotalAmount}','${PaymentType}','${OrderStatus}',GETDATE(),GETDATE());SELECT SCOPE_IDENTITY() AS OrderId;`

                try {

                    (await DBUtils.sqlServerConnection).request().query(sqlquery, function (error, results) {
                        if (results) {
                            resolve(results.recordset?.[0]?.OrderId);
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

        billAddressInsert: (OrderId) => {

            return new Promise(async (resolve, reject) => {

                const {
                    CustId, Address, City, State, Pincode, Country, LandMark
                } = ctx.request.body;

                let sqlquery = `INSERT INTO [dbo].[tb_BillingAddress]([CustId],[OrderId],[Address],[City],[State],[Pincode],[Country],[LandMark],[CreatedOn],[ModifiedOn])
                                VALUES ('${CustId}','${OrderId}','${Address}','${City}','${State}','${Pincode}','${Country}','${LandMark}',GETDATE(),GETDATE());`

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

        orderDetailsInsert: (OrderId) => {

            return new Promise(async (resolve, reject) => {

                const {
                    OrderedItems
                } = ctx.request.body;

                let sqlquery = ``;

                OrderedItems?.forEach(data => {
                    sqlquery = sqlquery + `INSERT INTO [dbo].[tb_OrderDetails]([OrderId],[ProductId],[Quantity],[CreatedOn],[ModifiedOn])
                        VALUES('${OrderId}','${data.ProductId}','${data.Quantity}',GETDATE(),GETDATE());`
                });

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

        shippingDetInsert: (OrderId) => {

            return new Promise(async (resolve, reject) => {

                const {
                    CustId, ShippingStatus
                } = ctx.request.body;

                let sqlquery = `INSERT INTO [dbo].[tb_ShippingDetails]([CustId],[OrderId],[Status],[CreatedOn],[ModifiedOn])
                                VALUES ('${CustId}','${OrderId}','${ShippingStatus}',GETDATE(),GETDATE());`

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

        shippingDetailsUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, Status
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_ShippingDetails] SET Status = '${Status}', ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        getOrderDetails: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    CustId
                } = ctx.request.query;

                let sqlquery = `SELECT Orders.[Id] AS OrderId,Orders.[CustId],Orders.[OrderDate],Orders.[Amount],Orders.[DiscountAmount],Orders.[DeliveryCharge],Orders.[TotalAmount],Orders.[PaymentType],Orders.[Status] AS OrderStatus,
                                OrderDetails.Quantity AS ODQuantity, Products.ProductCode,Products.ProductDescription, Products.ProductImage, ShipDetails.Status As ShippingStatus
                                FROM [dbo].[tb_Orders] Orders INNER JOIN [dbo].[tb_OrderDetails] OrderDetails ON Orders.Id = OrderDetails.OrderId
                                INNER JOIN [dbo].[tb_Products] Products ON OrderDetails.ProductId = Products.Id
                                INNER JOIN [dbo].[tb_ShippingDetails] ShipDetails ON Orders.Id = ShipDetails.OrderId WHERE Orders.CustId = '${CustId}'`

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