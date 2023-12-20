const VError = require('verror');
const Router = require('koa-router');
const router = new Router();
const Products = require('../library/products');

router.get('/getProductsList', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getProductsList();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/productsInsert', async (ctx, next) => {
    const updates = Products(ctx);

    try { 
        const productsDetails = await updates.productsDetailsInsert();
        console.log("p",productsDetails);
        const response = await updates.productsInsert(productsDetails);
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/productsUpdate', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.productsUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/categoryUpdate', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.categoryUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/prodInventoryUpdate', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.prodInventoryUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/prodDiscountUpdate', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.prodDiscountUpdate();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getProductsById', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getProductsById();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getCategoryById', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getCategoryById();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getProdInventoryById', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getProdInventoryById();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getProdDiscountById', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getProdDiscountById();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/productsDelete', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.productsDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/categoryDelete', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.categoryDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/prodInventoryDelete', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.propInventoryDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.post('/prodDiscountDelete', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.prodDiscountDelete();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getTopRatedProducts', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getTopRatedProducts();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getSpecialOfferProducts', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getSpecialOfferProducts();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getBestSellerProducts', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getBestSellerProducts();
        ctx.body = response;
    }
    catch (err) {
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }

    await next();

});

router.get('/getFeaturedProducts', async (ctx, next) => {
    const updates = Products(ctx);

    try {
        const response = await updates.getFeaturedProducts();
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