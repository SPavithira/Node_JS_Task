
const DBUtils = require('../../common/dbUtils');

module.exports = (ctx) => {
    return {
        getCustomerLogin: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    EmailId, PhoneNo, Password
                } = ctx.request.query;

                let sqlquery = `SELECT Customers.[Id] AS CustId,Customers.[FirstName],Customers.[LastName],Customers.[EmailId],Customers.[Password],Customers.[PhoneNo],Customers.[IsActive],Cart.Id AS CartId,
                                Cart.ProductId AS CartProductId,Cart.Quantity AS CartQuantity,Cart.Amount AS CartAmount,WishList.Id AS WishListId,WishList.ProductId AS WLProductId,WishList.Quantity AS WishListQuantity,
                                Feedback.Id AS FeedbackId,Feedback.ProductId AS FeedbackProductId,Feedback.Value AS Ratings,Feedback.Message AS Reviews,Products1.ProductCode AS CartProductCode,Products1.ProductDescription AS CartProductDescription,
                                Products1.ProductImage AS CartProductImage,Products1.Price AS CartPrice,Category1.CategoryName AS CartCategoryName,Discount1.DiscountPercent AS CartDisCount,Discount1.SellingPrice AS CartSellingPrice,
                                Products2.ProductCode AS WLProductCode,Products2.ProductDescription AS WLProductDescription,Products2.ProductImage AS WLProductImage,Category2.CategoryName AS WLCategoryName,
                                Products3.ProductCode AS FBProductCode,Products3.ProductDescription AS FBProductDescription,Products3.ProductImage AS FBProductImage,Category3.CategoryName AS FBCategoryName
                                FROM [dbo].[tb_Customers] Customers LEFT JOIN [dbo].[tb_Cart] Cart ON Customers.Id = Cart.CustId AND Cart.IsActive = 1
                                INNER JOIN [dbo].[tb_Products] Products1 ON Cart.ProductId = Products1.Id AND Products1.IsActive = 1 AND Products1.IsDelete = 0
                                INNER JOIN [dbo].[tb_Category] Category1 ON Products1.CategoryId = Category1.Id AND Category1.IsActive = 1 AND Category1.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdDiscount] Discount1 ON Products1.DiscountId = Discount1.Id AND Discount1.IsActive = 1 AND Discount1.IsDelete = 0
                                LEFT JOIN [dbo].[tb_WishList] WishList ON Customers.Id = WishList.CustId AND WishList.IsActive = 1 
                                INNER JOIN [dbo].[tb_Products] Products2 ON Cart.ProductId = Products2.Id AND Products2.IsActive = 1 AND Products2.IsDelete = 0
                                INNER JOIN [dbo].[tb_Category] Category2 ON Products2.CategoryId = Category2.Id AND Category2.IsActive = 1 AND Category2.IsDelete = 0
                                LEFT JOIN [dbo].[tb_CustFeedback] Feedback ON Customers.Id = Feedback.CustId AND Feedback.IsDelete = 0
                                INNER JOIN [dbo].[tb_Products] Products3 ON Cart.ProductId = Products3.Id AND Products3.IsActive = 1 AND Products3.IsDelete = 0
                                INNER JOIN [dbo].[tb_Category] Category3 ON Products3.CategoryId = Category3.Id AND Category3.IsActive = 1 AND Category3.IsDelete = 0
                                WHERE Customers.IsActive = 1 AND Customers.IsDelete = 0`

                if (EmailId != undefined && EmailId != '') {
                    sqlquery = sqlquery + `AND Customers.EmailId = '${EmailId}'`
                }
                else if (PhoneNo != undefined && PhoneNo != '') {
                    sqlquery = sqlquery + `AND Customers.PhoneNo = '${PhoneNo}'`
                }

                if (Password != undefined && Password != '') {
                    sqlquery = sqlquery + `AND Customers.Password = '${Password}'`
                }

                try {

                    (await DBUtils.sqlServerConnection).request().query(sqlquery, function (error, results) {
                        if (results) {
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