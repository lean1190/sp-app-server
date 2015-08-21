/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals console, require, module, __dirname */

var express = require("express"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    Q = require("q"),
    path = require("path"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    app = express();

// ===== ROUTING DEFINITIONS

var commonRoutes = require("./routers/CommonRouter");
var usersRoutes = require("./routers/UserRouter");

// ===== DATABASE CONNECTION

mongoose.connect("mongodb://localhost/sp-app-db");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "[ERROR] - MongoDB: CONNECTION ERROR"));
db.once("open", function () {
    "use strict";
    console.log("[INFO] - MongoDB: CONNECTION OK");
});

// ===== MIDDLEWARE SETUP

app.use(logger("dev"));
// ALLOW CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// == ROUTES SETUP
app.use("/", commonRoutes);
app.use("/users", usersRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    "use strict";
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

Q.longStackSupport = true;

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
