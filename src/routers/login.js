const VError = require('verror');
const Router = require('koa-router');
const router = new Router();
const Login = require('../library/login');

router.get('/getCustomerLogin', async (ctx, next) => {
    const updates = Login(ctx);

    try {
        const response = await updates.getCustomerLogin();
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