/**
 * Created by guitarnut on 2/18/17.
 */

let express = require('express');
let fileUpload = require('express-fileupload');
let path = require("path");
let api = express.Router();

let profileDB = require('../data/queries/profile');
let image = require('../image/image_editor');

api.use(fileUpload());

// check auth
api.use((req, res, next)=> {
    if (!req.app.locals.authenticated) {
        res.redirect("/login?redirect=" + req.originalUrl);
    } else {
        next();
    }
});

api.get("/create", (req, res) => {
    res.render('profile/profile_create');
});

api.post("/create", (req, res) => {
    profileDB.createProfile(req.body, req.app.locals.userId)
        .then((data) => {
            res.redirect("/profile/view/" + data);
        })
        .catch((ex) => {
            req.app.locals.serverError = ex.toString();
            res.redirect('/error');
        })
});

api.get("/image", (req, res) => {
    res.render('profile/profile_image');
});

api.post("/image", (req, res) => {
    let imagePath = path.join(__dirname, '../../', 'uploads/' + req.app.locals.profile.id + '_profile_image_default.jpg');

    req.files.profileImage.mv(imagePath, (err) => {
        if (err) {
            req.app.locals.serverError = err.toString();
            res.redirect('/error');
        } else {
            image.createProfileImage(imagePath)
                .then(() => {
                    res.redirect('/image');
                })
                .catch((err) => {
                    req.app.locals.serverError = err.toString();
                    res.redirect('/error');
                })
        }
    });
});

api.get("/view/:profile_id", (req, res) => {
    profileDB.getProfile(req.params.profile_id, req.app.locals.userId)
        .then((data) => {
            req.app.locals.profile = data;
            res.render('profile/profile_main');
        })
        .catch((ex) => {
            req.app.locals.serverError = ex.toString();
            res.redirect('/error');
        });
});

api.get("/view", (req, res) => {
    profileDB.getProfileByUserId(req.app.locals.userId)
        .then((data) => {
            res.redirect("/profile/view/" + data);
        })
        .catch((ex) => {
            res.redirect('/profile/create');
        });
});

api.get("/update/:profile_id", (req, res) => {
    profileDB.getProfile(req.params.profile_id, req.app.locals.userId)
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
            res.redirect('/profile/deleted');
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