const VError = require('verror');
const Router = require('koa-router');
const router = new Router();
const AdminRegister = require('../library/adminRegister');

router.get('/getUsersList', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.getUsersList();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getRevenueList', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.getRevenueList();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/adminInsert', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.adminInsert();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/adminUpdate', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.adminUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/adminTypeUpdate', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.adminTypeUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getAdminById', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.getAdminById();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getAdminTypeById', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.getAdminTypeById();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/adminDelete', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.adminDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/adminTypeDelete', async (ctx, next) => {
    const updates = AdminRegister(ctx);

    try {
        const response = await updates.adminTypeDelete();
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