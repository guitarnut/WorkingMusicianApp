/**
 * Created by guitarnut on 2/16/17.
 */

// TODO: Encript URL ID values
    // TODO: Join dates
    // TODO: Gather stats
    // TODO: Admin approval

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
let searchRouter = require('./js/routes/routes_search');
let musicianRouter = require('./js/routes/routes_musician');

// data
let formDB = require('./js/data/queries/form_data');

let app = express();

app.set("views", path.resolve(__dirname, "html/"));
app.set("view engine", "ejs");

app.locals.serverError = "";
app.locals.application = {};
app.locals.profile = {};
app.locals.musician = {};
app.locals.searchResults = [];
app.locals.authenticated = false;
app.locals.username = "";
app.locals.userId = null;
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
app.use("/search", searchRouter);
app.use("/login", loginRouter);
app.use("/profile", userRouter);
app.use("/musician", musicianRouter);

// error handling
app.get("/error", (req, res) => {
    res.render("static/500");
});

app.use((req, res) => {
    res.status(404).render("static/404");
});


function populateFormData(applicationData) {
    return new Promise((resolve) => {
        if (!applicationData.hasOwnProperty("formData")) {
            formDB.getData().then((data) => {
                applicationData.formData = data;
                resolve();
            })
                .catch((ex) => {
                    resolve();
                });
        } else {
            resolve();
        }
    });
}

// convert to promise.all() chain for all startup data, tasks, etc
function startup() {
    populateFormData(app.locals.application)
        .then(() => {
            // startup
            app.listen(3000, () => {
                console.log("App started");
            });
        })
        .catch((ex) => {
            console.log(ex);
            // shutdown
        })
}

startup();