/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId: Number,
    name: String,
    phone: String,
    email: String,
    profilePhoto: String,

    accessToken: String,
    refreshToken: String,

    // Guardia 1,2,3..etc segun como va rotando el telefono
    watchRound: Number,

    // Horarios, una colección de días con horario desde y hasta
    schedule: [{
        day: {
            type: String,
            enum: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
        },
        startHour: String,
        endHour: String
    }]
});

/**
 * Return true if the user starts working at the
 * day and hour passed as parameters
 *
 * @param day
 * @param hour
 * @return boolean
 */
UserSchema.methods.isInMySchedule = function (day, hour) {
    "use strict";

    for(var i = 0; i < this.schedule.length; i++) {
        var scheduleEntry = this.schedule[i];
        if (scheduleEntry.day === day && scheduleEntry.startHour === hour) {
            return true;
        }
    }

    return false;
};

module.exports = mongoose.model("User", UserSchema);
