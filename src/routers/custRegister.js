const VError = require('verror');
const Router = require('koa-router');
const router = new Router();
const Register = require('../library/custRegister');

router.post('/customersInsert', async (ctx, next) => {
    const updates = Register(ctx);

    try {
        const response = await updates.customersInsert();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/customersUpdate', async (ctx, next) => {
    const updates = Register(ctx);

    try {
        const response = await updates.customersUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/customersDelete', async (ctx, next) => {
    const updates = Register(ctx);

    try {
        const response = await updates.customersDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getCustomerById', async (ctx, next) => {
    const updates = Register(ctx);

    try {
        const response = await updates.getCustomerById();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

module.exports = router;