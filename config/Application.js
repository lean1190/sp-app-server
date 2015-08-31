/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals require, module */

var express = require("express"),
    cors = require("cors"),
    path = require("path"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser");

/**
 * The main express application constructor, setups the middleware
 * and the routes, with proper error handlers
 *
 * @param publicSettings an object with the path and the name for the public folder
 * e.g. {path: __dirname, folder: "public"}
 *
 * @param routers an array of objects with the route path and the router handler
 * e.g. [ {route: "/", handler: CommonRouter}, {route: "/users", handler: UserRouter} ]
 */
var app = function Application(publicSettings, routers) {
    "use strict";
    var expressApp = express();

    // Middleware setup
    expressApp.use(logger("dev"));
    expressApp.use(cors());
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({
        extended: false
    }));
    expressApp.use(cookieParser());
    expressApp.use(express.static(path.join(publicSettings.path, publicSettings.folder)));

    // Setup the custom routes
    for(var i = 0; i < routers.length; i++) {
        var router = routers[i];
        expressApp.use(router.route, router.handler);
    }

    // Catch 404 and forward to error handler
    expressApp.use(function (req, res, next) {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    // Error handlers

    // development error handler
    // will print stacktrace
    if (expressApp.get("env") === "development") {
        expressApp.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render("error", {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    expressApp.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: {}
        });
    });

    return expressApp;
};

module.exports = app;
