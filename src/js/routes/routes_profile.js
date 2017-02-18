/**
 * Created by guitarnut on 2/18/17.
 */

let express = require('express');
let api = express.Router();

let profileDB = require('../data/queries/profile');
let formDB = require('../data/queries/form_data');

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

api.get("/create", (req, res) => {
    populateFormData(req.app.locals.application)
        .then(() => {
            res.render('profile/profile_create');
        });
});

api.post("/create", (req, res) => {
    console.log(req.body);
    profileDB.createProfile(req.body)
        .then((data) => {
            res.redirect("/profile/view/" + data);
        })
        .catch((ex) => {
            req.app.locals.serverError = ex.toString();
            res.redirect('/error');
        })
});

api.get("/view/:profile_id", (req, res) => {
    profileDB.getProfile(req.params.profile_id)
        .then((data) => {
            req.app.locals.profile = data;
            res.render('profile/profile_main');
        })
        .catch((ex) => {
            req.app.locals.serverError = ex.toString();
            res.redirect('/error');
        });
});

api.get("/update/:profile_id", (req, res) => {
    populateFormData(req.app.locals.application);

    profileDB.getProfile(req.params.profile_id)
        .then((data) => {
            req.app.locals.profile = data;
            res.render('profile/profile_update');
        })
        .catch((ex) => {
            req.app.locals.serverError = ex.toString();
            res.redirect('/error');
        });
});

api.post("/update/:profile_id", (req, res) => {
    profileDB.updateProfile(req.params.profile_id, req.body)
        .then((data) => {
            res.redirect("/profile/view/" + data);
        })
        .catch((ex) => {
            req.app.locals.serverError = ex.toString();
            res.redirect('/error');
        })
});

api.get("/delete/:profile_id", (req, res) => {
    profileDB.deleteProfile(req.params.profile_id)
        .then(() => {
            res.redirect('/deleted');
        })
        .catch((ex) => {
            req.app.locals.serverError = ex.toString();
            res.redirect('/error');
        });
});

api.get("/deleted", (req, res) => {
    res.render('profile/profile_deleted');
});

module.exports = api;