/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals console, module, require */

var mongoose = require("mongoose");

var database = function Database(settings) {
    "use strict";
    this.settings = settings;
    this.connect = function () {
        mongoose.connect(this.settings.connectionUrl);
        var connection = mongoose.connection;
        connection.on("error", console.error.bind(console, "[ERROR] - MongoDB: CONNECTION ERROR"));
        connection.once("open", function () {
            console.log("[INFO] - MongoDB: CONNECTION OK");
        });
    };
};

module.exports = database;
