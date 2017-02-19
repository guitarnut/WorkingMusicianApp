/**
 * Created by guitarnut on 2/18/17.
 */

let express = require('express');
let session = require('express-session');
let api = express.Router();
let userDB = require('../data/queries/login');

api.get("/", (req, res) => {
    res.render("login/login_main");
});

api.post("/", (req, res) => {
    req.app.locals.pageErrorMessage = "";
    if (req.body.newUser) {
        userDB.createNewUser(req.body)
            .then((username) => {
                req.session.username = username;
                req.app.locals.authenticated = true;
                req.app.locals.username = username;

                if (req.query.redirect) {
                    res.redirect(req.query.redirect);
                } else {
                    res.redirect("/");
                }
            })
            .catch((ex) => {
                if (ex === "This username has already been taken.") {
                    req.app.locals.pageErrorMessage = ex;
                    res.redirect("/login");
                } else {
                    req.app.locals.serverError = ex;
                    res.redirect("/error");
                }
            });
    } else {
        userDB.loginExistingUser(req.body)
            .then((username) => {
                req.session.username = username;
                req.app.locals.authenticated = true;
                req.app.locals.username = username;

                if (req.query.redirect) {
                    res.redirect(req.query.redirect);
                } else {
                    res.redirect("/");
                }
            })
            .catch((ex) => {
                if (ex === "Invalid credentials.") {
                    req.app.locals.pageErrorMessage = ex;
                    res.redirect("/login");
                } else {
                    req.app.locals.serverError = ex;
                    res.redirect("/error");
                }
            });
    }
});

api.get("/end", (req, res) => {
    req.session.username = "";
    req.app.locals.authenticated = false;

    res.redirect("/");
});

module.exports = api;