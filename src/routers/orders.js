const VError = require('verror');
const Router = require('koa-router');
const router = new Router();
const Orders = require('../library/orders');

router.post('/ordersInsert', async (ctx, next) => {
    const updates = Orders(ctx);

    try {
        const ordersInsertId = await updates.ordersInsert();
        const billAddressInsert = await updates.billAddressInsert(ordersInsertId);
        const orderDetailsInsert = await updates.orderDetailsInsert(ordersInsertId);
        const shippingDetInsert = await updates.shippingDetInsert(ordersInsertId);

        var response = [{
            ordersInsertId: ordersInsertId,
            billAddressInsert: billAddressInsert,
            orderDetailsInsert: orderDetailsInsert,
            shippingDetInsert: shippingDetInsert
        }]

        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.post('/shippingDetailsUpdate', async (ctx, next) => {
    const updates = Orders(ctx);

    try {
        const response = await updates.shippingDetailsUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.get('/getOrderDetails', async (ctx, next) => {
    const updates = Orders(ctx);

    try {
        const response = await updates.getOrderDetails();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

module.exports = router;