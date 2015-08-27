/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals console, module, require */

var handleErrors = function HandleErrors(app) {
    "use strict";

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    // Error handlers

    // development error handler
    // will print stacktrace
    if (app.get("env") === "development") {
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render("error", {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: {}
        });
    });
};

module.exports = handleErrors;
