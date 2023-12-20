const VError = require('verror');
const Router = require('koa-router');
const router = new Router();
const Cart = require('../library/cart');

router.post('/cartInsert', async (ctx, next) => {
    const updates = Cart(ctx);

    try {
        const response = await updates.cartInsert();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.post('/cartUpdate', async (ctx, next) => {
    const updates = Cart(ctx);

    try {
        const response = await updates.cartUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.post('/cartDelete', async (ctx, next) => {
    const updates = Cart(ctx);

    try {
        const response = await updates.cartDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.get('/getCartById', async (ctx, next) => {
    const updates = Cart(ctx);

    try {
        const response = await updates.getCartById();
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