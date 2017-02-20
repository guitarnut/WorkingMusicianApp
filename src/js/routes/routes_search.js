/**
 * Created by guitarnut on 2/18/17.
 */

let express = require('express');
let api = express.Router();
let searchDB = require('../data/queries/search');

api.get("/", (req, res) => {
    res.render("search/search_profiles");
});

api.post("/", (req, res) => {
    searchDB.searchProfiles(req.body)
        .then((data)=> {
            if (data.length === 0) {
                req.app.locals.pageErrorMessage = "No results found.";
                res.render("search/search_profiles");
            } else {
                req.app.locals.pageErrorMessage = "";
                req.app.locals.searchResults = data;
                res.redirect("search/results");
            }
        })
        .catch((ex)=> {
            req.app.locals.serverError = ex;
            res.redirect("/error");
        });
});

api.get("/results", (req, res)=> {
    if(req.app.locals.searchResults.length === 0) {
        req.app.locals.pageErrorMessage = "No results found.";
        res.redirect("/search");
    }
    res.render("search/search_results");
});

module.exports = api;