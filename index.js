const koa = require('koa');
const bodyparser = require('koa-bodyparser');

const app = new koa();

app.use(bodyparser());

const Register = require("./src/routers/custRegister");
const AdminRegister = require("./src/routers/adminRegister");
const Login = require("./src/routers/login");
const Product = require("./src/routers/products");
const Orders = require("./src/routers/orders");
const Feedback = require("./src/routers/feedback");
const Cart = require("./src/routers/cart");
const WishList = require("./src/routers/wishlist");


app.use(Register.routes());
app.use(AdminRegister.routes());
app.use(Login.routes());
app.use(Product.routes());
app.use(Orders.routes());
app.use(Feedback.routes());
app.use(Cart.routes());
app.use(WishList.routes());


app.listen(8000, function () {
    console.log("Listening : 8000")
})