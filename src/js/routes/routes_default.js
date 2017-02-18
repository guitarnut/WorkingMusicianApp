/**
 * Created by guitarnut on 2/18/17.
 */

let express = require('express');
let logger = require("morgan");
let api = express.Router();

api.get("/", (req, res) => {
    res.render("static/index");
});

module.exports = api;