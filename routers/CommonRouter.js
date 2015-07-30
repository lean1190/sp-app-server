/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    "use strict";
    res.status(200).send("Hello!");
});

module.exports = router;
