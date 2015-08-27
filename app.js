/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals require, module, __dirname */

    // Config modules
var Database = require("./config/Database"),
    Application = require("./config/Application"),
    Passport = require("./config/Passport"),

    // Routes modules
    CommonRouter = require("./routers/CommonRouter"),
    UserRouter = require("./routers/UserRouter");

// ===== DATABASE CONNECTION
var db = new Database({ connectionUrl : "mongodb://localhost/sp-app-db" });
db.connect();

// ===== APP SETUP
var app = new Application({path: __dirname, folder: "public"}, [
    {route: "/", handler: CommonRouter},
    {route: "/users", handler: UserRouter}
]);

// ===== PASSPORT SETUP
var passport = new Passport({ secret: "some random and not easy key", authCallbackUrl: "http://127.0.0.1:3000/auth/google/callback" });
passport.register(app);

module.exports = app;
