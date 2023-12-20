const VError = require('verror');
const Router = require('koa-router');
const router = new Router();
const WishList = require('../library/wishlist');

router.post('/wishListInsert', async (ctx, next) => {
    const updates = WishList(ctx);

    try {
        const response = await updates.wishListInsert();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.post('/wishListUpdate', async (ctx, next) => {
    const updates = WishList(ctx);

    try {
        const response = await updates.wishListUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.post('/wishListDelete', async (ctx, next) => {
    const updates = WishList(ctx);

    try {
        const response = await updates.wishListDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

})

router.get('/getWishListById', async (ctx, next) => {
    const updates = WishList(ctx);

    try {
        const response = await updates.getWishListById();
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