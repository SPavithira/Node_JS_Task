const DBUtils = require('../../common/dbUtils');

module.exports = (ctx) => {
    return {
        getProductsList: () => {

            return new Promise(async (resolve, reject) => {

                let sqlquery = `SELECT Products.[Id] AS ProductId,Products.[ProductCode],Products.[ProductDescription],Products.[CategoryId],Products.[InventoryId],Products.[DiscountId],Products.[ProductImage],
                                Products.[IsFeatured],Products.[Price],Category.CategoryName,Inventory.Quantity,Discount.DiscountPercent,Discount.SellingPrice FROM [dbo].[tb_Products] Products 
                                INNER JOIN [dbo].[tb_Category] Category ON Products.CategoryId = Category.Id AND Category.IsActive = 1 AND Category.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdInventory] Inventory ON Products.InventoryId = Inventory.Id AND Inventory.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdDiscount] Discount ON Products.DiscountId = Discount.Id AND Discount.IsActive = 1 AND Discount.IsDelete = 0
                                WHERE Products.IsActive = 1 AND Products.IsDelete = 0`;

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
        },

        productsDetailsInsert: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    CategoryName, Quantity, Discount, SellingPrice
                } = ctx.request.body;

                let pram = "", pram1 = ""

                if (Discount != undefined && Discount != '') {
                    pram = pram + ` DiscountPercent`
                    pram1 = pram1 + ` '${Discount}'`
                }
                else {
                    pram = pram + ` DiscountPercent`
                    pram1 = pram1 + ` 0`
                }

                if (SellingPrice != undefined && SellingPrice != '') {
                    pram = pram + `, SellingPrice`
                    pram1 = pram1 + `, '${SellingPrice}'`
                }
                else {
                    pram = pram + `, SellingPrice`
                    pram1 = pram1 + `, 0`
                }

                pram = pram.substring(1);
                pram1 = pram1.substring(1);

                let sqlquery = `INSERT INTO [dbo].[tb_Category]([CategoryName],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn])
                                VALUES('${CategoryName}','${true}','${false}',GETDATE(),GETDATE()); SELECT SCOPE_IDENTITY() AS CategoryId;
                                INSERT INTO [dbo].[tb_ProdInventory]([Quantity],[IsDelete],[CreatedOn],[ModifiedOn])
                                VALUES('${Quantity}','${false}',GETDATE(),GETDATE()); SELECT SCOPE_IDENTITY() AS InventoryId;
                                INSERT INTO [dbo].[tb_ProdDiscount](` + pram + `,[IsActive],[IsDelete],[CreatedOn],[ModifiedOn])
                                VALUES(` + pram1 + `,'${true}','${false}',GETDATE(),GETDATE()); SELECT SCOPE_IDENTITY() AS DiscountId;`

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

        productsInsert: (productsDetails) => {

            return new Promise(async (resolve, reject) => {

                const {
                    ProductCode, Description, ImageFileName, IsFeatured, Price
                } = ctx.request.body;

                let pram = "", pram1 = ""

                if (ImageFileName != undefined && ImageFileName != '') {
                    pram = pram + `, ProductImage`
                    pram1 = pram1 + `, '${ImageFileName}'`
                }
                else {
                    pram = pram + `, ProductImage`
                    pram1 = pram1 + `, null`
                }

                if (IsFeatured != undefined && IsFeatured != '') {
                    pram = pram + `, IsFeatured`
                    pram1 = pram1 + `, '${IsFeatured}'`
                }
                else {
                    pram = pram + `, IsFeatured`
                    pram1 = pram1 + `, '${false}'`
                }

                pram = pram.substring(1);
                pram1 = pram1.substring(1);

                let sqlquery = `INSERT INTO [dbo].[tb_Products]([ProductCode],[ProductDescription],[CategoryId],[InventoryId],[DiscountId]` + pram + `,[Price],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn])
                                VALUES('${ProductCode}','${Description}','${productsDetails.CategoryId}','${productsDetails.InventoryId}','${productsDetails.DiscountId}'` + pram1 + `,'${Price}','${true}','${false}',GETDATE(),GETDATE());`

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

        productsUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, ProductCode, Description, ImageFileName, IsFeatured, Price, IsActive
                } = ctx.request.body;

                let pram = ""

                if (ProductCode != undefined && ProductCode != '')
                    pram = pram + ` ProductCode = '${ProductCode}'`

                if (Description != undefined && Description != '')
                    pram = pram + `, ProductDescription = '${Description}'`

                if (ImageFileName != undefined && ImageFileName != '')
                    pram = pram + `, ProductImage = '${ImageFileName}'`
                else {
                    pram = pram + `, ProductImage = null`
                }

                if (IsFeatured != undefined && IsFeatured != '')
                    pram = pram + `, IsFeatured = '${IsFeatured}'`
                else {
                    pram = pram + `, IsFeatured = '${false}'`
                }

                if (Price != undefined && Price != '')
                    pram = pram + `, Price = '${Price}'`
                else {
                    pram = pram + `, Price = null`
                }

                if (IsActive != undefined && IsActive != '')
                    pram = pram + `, IsActive = '${IsActive}'`
                else {
                    pram = pram + `, IsActive = '${false}'`
                }

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_Products] SET` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        categoryUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, CategoryName, IsActive
                } = ctx.request.body;

                let pram = ""

                if (CategoryName != undefined && CategoryName != '')
                    pram = pram + ` CategoryName = '${CategoryName}'`

                if (IsActive != undefined && IsActive != '')
                    pram = pram + `, IsActive = '${IsActive}'`
                else {
                    pram = pram + `, IsActive = '${false}'`
                }

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_Category] SET` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        prodInventoryUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, Quantity
                } = ctx.request.body;

                let pram = ""

                if (Quantity != undefined && Quantity != '')
                    pram = pram + ` Quantity = '${Quantity}'`

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_ProdInventory] SET` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        prodDiscountUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, Discount, SellingPrice
                } = ctx.request.body;

                let pram = ""

                if (Discount != undefined && Discount != '')
                    pram = pram + ` DiscountPercent = '${Discount}'`
                else {
                    pram = pram + ` DiscountPercent = 0`
                }

                if (SellingPrice != undefined && SellingPrice != '')
                    pram = pram + `, SellingPrice = '${SellingPrice}'`
                else {
                    pram = pram + `, SellingPrice = 0`
                }

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_ProdDiscount] SET` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        getProductsById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[ProductCode],[ProductDescription],[CategoryId],[InventoryId],[DiscountId],[ProductImage],[IsFeatured],[Price],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn] FROM [dbo].[tb_Products] WHERE Id = '${Id}'`

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

        getCategoryById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[CategoryName],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn] FROM [dbo].[tb_Category] WHERE Id = '${Id}'`

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

        getProdInventoryById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[Quantity],[IsDelete],[CreatedOn],[ModifiedOn] FROM [dbo].[tb_ProdInventory] WHERE Id = '${Id}'`

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

        getProdDiscountById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[DiscountPercent],[SellingPrice],[IsActive],[IsDelete],[CreatedOn],[ModifiedOn] FROM [dbo].[tb_ProdDiscount] WHERE Id = '${Id}'`

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

        productsDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_Products] SET IsDelete = 1, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        categoryDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_Category] SET IsDelete = 1, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        propInventoryDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_ProdInventory] SET IsDelete = 1, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        prodDiscountDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_ProdDiscount] SET IsDelete = 1, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        getTopRatedProducts: () => {

            return new Promise(async (resolve, reject) => {

                let sqlquery = `SELECT Products.[Id] AS ProductId,Products.[ProductCode],Products.[ProductDescription],Products.[CategoryId],Products.[InventoryId],Products.[DiscountId],Products.[ProductImage],
                                Products.[IsFeatured],Products.[Price],Category.CategoryName,Inventory.Quantity,Discount.DiscountPercent,Discount.SellingPrice,FB.Value AS Ratings FROM [dbo].[tb_Products] Products 
                                INNER JOIN [dbo].[tb_Category] Category ON Products.CategoryId = Category.Id AND Category.IsActive = 1 AND Category.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdInventory] Inventory ON Products.InventoryId = Inventory.Id AND Inventory.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdDiscount] Discount ON Products.DiscountId = Discount.Id AND Discount.IsActive = 1 AND Discount.IsDelete = 0
                                INNER JOIN [dbo].[tb_CustFeedback] FB ON Products.Id = FB.ProductId AND FB.IsDelete = 0
                                WHERE Products.IsActive = 1 AND Products.IsDelete = 0 ORDER BY FB.Value DESC;`

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
        },

        getSpecialOfferProducts: () => {

            return new Promise(async (resolve, reject) => {

                let sqlquery = `SELECT Products.[Id] AS ProductId,Products.[ProductCode],Products.[ProductDescription],Products.[CategoryId],Products.[InventoryId],Products.[DiscountId],Products.[ProductImage],
                                Products.[IsFeatured],Products.[Price],Category.CategoryName,Inventory.Quantity,Discount.DiscountPercent,Discount.SellingPrice FROM [dbo].[tb_Products] Products 
                                INNER JOIN [dbo].[tb_Category] Category ON Products.CategoryId = Category.Id AND Category.IsActive = 1 AND Category.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdInventory] Inventory ON Products.InventoryId = Inventory.Id AND Inventory.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdDiscount] Discount ON Products.DiscountId = Discount.Id AND Discount.IsActive = 1 AND Discount.IsDelete = 0
                                WHERE Products.IsActive = 1 AND Products.IsDelete = 0 ORDER BY Discount.[DiscountPercent] DESC;`

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
        },

        getBestSellerProducts: () => {

            return new Promise(async (resolve, reject) => {

                let sqlquery = `SELECT Products.[Id] AS ProductId,Products.[ProductCode],Products.[ProductDescription],Products.[CategoryId],Products.[InventoryId],Products.[DiscountId],Products.[ProductImage],
                                Products.[IsFeatured],Products.[Price],Category.CategoryName,Inventory.Quantity,Discount.DiscountPercent,Discount.SellingPrice,OD.Quantity AS ODQuantity FROM [dbo].[tb_Products] Products 
                                INNER JOIN [dbo].[tb_Category] Category ON Products.CategoryId = Category.Id AND Category.IsActive = 1 AND Category.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdInventory] Inventory ON Products.InventoryId = Inventory.Id AND Inventory.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdDiscount] Discount ON Products.DiscountId = Discount.Id AND Discount.IsActive = 1 AND Discount.IsDelete = 0
                                INNER JOIN [dbo].[tb_OrderDetails] OD ON Products.Id = OD.ProductId
                                WHERE Products.IsActive = 1 AND Products.IsDelete = 0 ORDER BY OD.Quantity DESC;`

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
        },

        getFeaturedProducts: () => {

            return new Promise(async (resolve, reject) => {

                let sqlquery = `SELECT Products.[Id] AS ProductId,Products.[ProductCode],Products.[ProductDescription],Products.[CategoryId],Products.[InventoryId],Products.[DiscountId],Products.[ProductImage],
                                Products.[IsFeatured],Products.[Price],Category.CategoryName,Inventory.Quantity,Discount.DiscountPercent,Discount.SellingPrice FROM [dbo].[tb_Products] Products 
                                INNER JOIN [dbo].[tb_Category] Category ON Products.CategoryId = Category.Id AND Category.IsActive = 1 AND Category.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdInventory] Inventory ON Products.InventoryId = Inventory.Id AND Inventory.IsDelete = 0
                                INNER JOIN [dbo].[tb_ProdDiscount] Discount ON Products.DiscountId = Discount.Id AND Discount.IsActive = 1 AND Discount.IsDelete = 0
                                WHERE Products.IsFeatured = 1 AND Products.IsActive = 1 AND Products.IsDelete = 0;`

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