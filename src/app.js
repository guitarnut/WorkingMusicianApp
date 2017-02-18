/**
 * Created by guitarnut on 2/16/17.
 */

let express = require("express");
let path = require("path");
let logger = require("morgan");
let http = require("http");
let bodyParser = require("body-parser");

// routers
let defaultRouter = require('./js/routes/routes_default');
let userRouter = require('./js/routes/routes_profile');

let app = express();

app.set("views", path.resolve(__dirname, "html/"));
app.set("view engine", "ejs");

// let entries = [];
// app.locals.entries = entries;
app.locals.serverError = "";
app.locals.application = {};

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", (req, res)=> {
    res.render("static/index");
});

// routes
app.use("/", defaultRouter);
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