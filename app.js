/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals console, require, module, __dirname */

var express = require("express");
var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// ===== MODELS BOOTSTRAP

var modelsPath = __dirname + "/models";
fs.readdirSync(modelsPath).forEach(function (file) {
    "use strict";
    if (~file.indexOf(".js")) {
        require(modelsPath + "/" + file);
    }
});

// ===== ROUTING DEFINITIONS

var commonRoutes = require("./controllers/CommonController");
var usersRoutes = require("./controllers/UserController");

// ===== DATABASE CONNECTIOn

mongoose.connect("mongodb://localhost/sp-app-db");
var db = mongoose.connection;
db.on("error", console.error.bind(console, ":: DB CONNECTION ERROR :"));
db.once("open", function () {
    "use strict";
    console.log("MongoDB - CONNECTION OK");
});

// ===== MIDDLEWARE SETUP

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", commonRoutes);
app.use("/users", usersRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    "use strict";
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// ===== ERROR HANDLERS

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        "use strict";
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    "use strict";
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

module.exports = app;
