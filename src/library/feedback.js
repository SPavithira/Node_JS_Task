
const DBUtils = require('../../common/dbUtils');

module.exports = (ctx) => {
    return {
        userFeedbackInsert: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    CustId, ProductId, Value, Message
                } = ctx.request.body;

                let pram = ""
                let values = ""

                if (Value != undefined && Value != '') {
                    pram = pram + `, Value `
                    values = values + `, '${Value}'`
                }
                else {
                    pram = pram + `, Value `
                    values = values + `, null`
                }

                if (Message != undefined && Message != '') {
                    pram = pram + `, Message `
                    values = values + `, '${Message}'`
                }
                else {
                    pram = pram + `, Message `
                    values = values + `, null`
                }

                let sqlquery = `INSERT INTO [dbo].[tb_CustFeedback]([CustId],[ProductId]` + pram + `,[IsDelete],[CreatedOn],[ModifiedOn]) 
                                VALUES('${CustId}','${ProductId}'` + values + `,'${false}',GETDATE(),GETDATE());`

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

        userFeedbackUpdate: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id, Value, Message
                } = ctx.request.body;

                let pram = ""

                if (Value != undefined && Value != '')
                    pram = pram + ` Value = '${Value}'`
                else {
                    pram = pram + ` Value = null`
                }

                if (Message != undefined && Message != '')
                    pram = pram + `, Message = '${Message}'`
                else {
                    pram = pram + `, Message = null`
                }

                pram = pram.substring(1);

                let sqlquery = `UPDATE [dbo].[tb_CustFeedback] SET ` + pram + `, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        userFeedbackDelete: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.body;

                let sqlquery = `UPDATE [dbo].[tb_CustFeedback] SET IsDelete = 1, ModifiedOn = GETDATE() WHERE Id = '${Id}'`

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

        getFeedbackById: () => {

            return new Promise(async (resolve, reject) => {

                const {
                    Id
                } = ctx.request.query;

                let sqlquery = `SELECT [Id],[CustId],[ProductId],[Value],[Message],[IsDelete],[CreatedOn],[ModifiedOn]
                                FROM [dbo].[tb_CustFeedback] WHERE Id='${Id}' AND IsDelete = 0`

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