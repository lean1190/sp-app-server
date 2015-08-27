/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals console, module, require */

var session = require("express-session"),
    passport = require("passport"),
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var passportConfigured = function Passport(settings) {
    "use strict";

    this.settings = settings;
    // Google OAuth2 config
    this.GOOGLE_CLIENT_ID = "10166761084-0vrr8qe7vr4rkqmjpelucqdukehh1jt8.apps.googleusercontent.com";
    this.GOOGLE_CLIENT_SECRET = "X3iM38LRMqhI6nIFnqAZKxre";

    this.register = function (app) {
        // Session config
        app.use(session({
            secret: this.settings.secret,
            resave: false,
            saveUninitialized: false
        }));

        // Passport session setup.
        //   To support persistent login sessions, Passport needs to be able to
        //   serialize users into and deserialize users out of the session.  Typically,
        //   this will be as simple as storing the user ID when serializing, and finding
        //   the user by ID when deserializing.
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (obj, done) {
            done(null, obj);
        });

        // Use the GoogleStrategy within Passport.
        //   Strategies in Passport require a `verify` function, which accept
        //   credentials (in this case, an accessToken, refreshToken, and Google
        //   profile), and invoke a callback with a user object.
        passport.use(new GoogleStrategy({
                clientID: this.GOOGLE_CLIENT_ID,
                clientSecret: this.GOOGLE_CLIENT_SECRET,
                callbackURL: this.settings.authCallbackUrl
            },
            function (accessToken, refreshToken, profile, done) {
                console.log(": profile", profile);
                console.log(": done", done);
                return;
            }
        ));

        // Initialize Passport!  Also use passport.session() middleware, to support
        // persistent login sessions (recommended).
        app.use(passport.initialize());
        app.use(passport.session());
    };


};

module.exports = passportConfigured;
