/**
 * Created by guitarnut on 2/16/17.
 */

let express = require("express");
let session = require('express-session');
let path = require("path");
let logger = require("morgan");
let http = require("http");
let bodyParser = require("body-parser");

// routers
let defaultRouter = require('./js/routes/routes_default');
let loginRouter = require('./js/routes/routes_login');
let userRouter = require('./js/routes/routes_profile');

let app = express();

app.set("views", path.resolve(__dirname, "html/"));
app.set("view engine", "ejs");

app.locals.serverError = "";
app.locals.application = {};
app.locals.profile = {};
app.locals.authenticated = false;
app.locals.username = "";
app.locals.pageErrorMessage = "";

app.use(logger("dev"));
app.use(express.static("src/images"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    name: 'working-musician',
    secret: 'shhh',
    resave: false,
    saveUninitialized: true
}));

// routes
app.use("/", defaultRouter);
app.use("/login", loginRouter);
app.use("/profile", userRouter);

// error handling
app.get("/error", (req, res)=> {
    res.render("static/500");
});

app.use((req, res)=> {
    res.status(404).render("static/404");
});

// startup
app.listen(3000, ()=> {
    console.log("App started");
});