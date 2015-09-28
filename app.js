/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals require, module, __dirname */

var // Config modules
    Database = require("./config/Database"),
    Application = require("./config/Application"),

    // Routes modules
    CommonRouter = require("./routers/CommonRouter"),
    SessionRouter = require("./routers/SessionRouter"),
    UserRouter = require("./routers/UserRouter");

// ===== DATABASE CONNECTION
//var db = new Database({ connectionUrl : "mongodb://localhost/sp-app-db" });
var db = new Database({ connectionUrl : "mongodb://main:the123asdpassword@ds059702.mongolab.com:59702/sp-app-server" });
db.connect();

// ===== APP SETUP
var app = new Application({path: __dirname, folder: "public"}, [
    {route: "/", handler: CommonRouter},
    {route: "/auth", handler: SessionRouter},
    {route: "/users", handler: UserRouter}
]);

module.exports = app;
