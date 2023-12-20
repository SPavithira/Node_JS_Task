const VError = require('verror');
const Router = require('koa-router');
const router = new Router();
const Feedback = require('../library/feedback');

router.post('/userFeedbackInsert', async (ctx, next) => {
    const updates = Feedback(ctx);

    try {
        const response = await updates.userFeedbackInsert();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.post('/userFeedbackUpdate', async (ctx, next) => {
    const updates = Feedback(ctx);

    try {
        const response = await updates.userFeedbackUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.post('/userFeedbackDelete', async (ctx, next) => {
    const updates = Feedback(ctx);

    try {
        const response = await updates.userFeedbackDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.get('/getFeedbackById', async (ctx, next) => {
    const updates = Feedback(ctx);

    try {
        const response = await updates.getFeedbackById();
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