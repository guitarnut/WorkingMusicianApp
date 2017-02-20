/**
 * Created by guitarnut on 2/18/17.
 */

let express = require('express');
let session = require('express-session');
let api = express.Router();
let userDB = require('../data/queries/login');

function loginSuccess(username, req, res, userId) {
    req.app.locals.userId = userId;
    req.session.username = username;
    req.app.locals.authenticated = true;
    req.app.locals.username = username;

    if (req.query.redirect) {
        res.redirect(req.query.redirect);
    } else {
        res.redirect("/");
    }
}

function loginFailure(msg, req, res) {
    req.app.locals.pageErrorMessage = msg;
    res.redirect("/login");
}

function serverError(msg, req, res) {
    req.app.locals.serverError = msg;
    res.redirect("/error");
}

function clearApplicationUserData(req) {
    req.app.locals.serverError = "";
    req.app.locals.profile = {};
    req.app.locals.musician = {};
    req.app.locals.searchResults = [];
    req.app.locals.authenticated = false;
    req.app.locals.username = "";
    req.app.locals.userId = null;
    req.app.locals.pageErrorMessage = "";
}

api.get("/", (req, res) => {
    res.render("login/login_main");
});

api.post("/", (req, res) => {
    req.app.locals.pageErrorMessage = "";

    if (req.body.newUser) {
        userDB.checkForExistingUser(req.body)
            .then(() => {
                userDB.createNewUser(req.body)
                    .then((data) => {
                        loginSuccess(data.username, req, res, data.userId);
                    })
                    .catch((ex) => {
                        if (ex === "This username has already been taken.") {
                            loginFailure(ex, req, res);
                        } else {
                            serverError(ex, req, res);
                        }
                    });
            })
            .catch((ex) => {
                if (ex === "This username has already been taken.") {
                    loginFailure(ex, req, res);
                } else {
                    serverError(ex, req, res);
                }
            });

        return;
    }

    userDB.loginExistingUser(req.body)
        .then((data) => {
            loginSuccess(data.username, req, res, data.userId);
        })
        .catch((ex) => {
            if (ex === "Invalid credentials.") {
                loginFailure(ex, req, res);
            } else {
                serverError(ex, req, res);
            }
        });
});

api.get("/end", (req, res) => {
    clearApplicationUserData(req);
    res.redirect("/");
});

module.exports = api;