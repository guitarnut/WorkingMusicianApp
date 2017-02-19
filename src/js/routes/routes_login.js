/**
 * Created by guitarnut on 2/18/17.
 */

let express = require('express');
let session = require('express-session');
let api = express.Router();
let userDB = require('../data/queries/login');

function loginSuccess(username, req, res) {
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

api.get("/", (req, res) => {
    res.render("login/login_main");
});

api.post("/", (req, res) => {
    req.app.locals.pageErrorMessage = "";

    if (req.body.newUser) {
        userDB.checkForExistingUser(req.body)
            .then(() => {
                userDB.createNewUser(req.body)
                    .then((username) => {
                        loginSuccess(username, req, res);
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
        .then((username) => {
            loginSuccess(username, req, res);
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
    req.session.username = "";
    req.app.locals.authenticated = false;

    res.redirect("/");
});

module.exports = api;