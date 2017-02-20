/**
 * Created by guitarnut on 2/18/17.
 */

let express = require('express');
let fileUpload = require('express-fileupload');
let api = express.Router();

let musicianDB = require('../data/queries/musician');
let image = require('../image/image_editor');

api.use(fileUpload());

api.get("/view/:musician_id", (req, res) => {
    musicianDB.getProfile(req.params.musician_id)
        .then((data) => {
            req.app.locals.musician = data;
            res.render('musician/musician_main');
        })
        .catch((ex) => {
            req.app.locals.serverError = ex.toString();
            res.redirect('/error');
        });
});

module.exports = api;