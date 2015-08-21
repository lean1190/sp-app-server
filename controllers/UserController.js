/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/User.js");

var mongoose = require("mongoose");
var User = mongoose.model("User");
var GenericMongooseWrapper = require("../utils/GenericMongooseWrapper");

var UserController = {};
var userQuerier = new GenericMongooseWrapper("User", "../models/User");

/**
 *  ===============================
 *  ==== BASIC USER OPERATIONS ====
 *  ===============================
 */

// Return all users
UserController.findAll = function (req, res) {
    "use strict";
    userQuerier.find().then(function (users) {
        console.log(":: USERS: ", users);
        res.status(200).jsonp(users);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Return a User with specified ID
UserController.findById = function (req, res) {
    "use strict";
    userQuerier.findById(req.params.id).then(function (user) {
        console.log(":: USER: ", user);
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Return a User with specified name
UserController.findByName = function (req, res) {
    "use strict";
    userQuerier.find({
        name: req.params.name
    }).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Add a new User
UserController.addUser = function (req, res) {
    "use strict";
    console.log(req.body);

    var newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        watchRound: -1,
        schedule: []
    });

    userQuerier.save(newUser).then(function (user) {
        res.status(200).jsonp(user);
    }, function (err) {
        return res.status(500).send(err.message);
    });
};

// Update an existing User
UserController.updateUser = function (req, res) {
    "use strict";

    userQuerier.findById(req.params.id).then(function (user) {
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.email = req.body.email || user.email;

        userQuerier.save(user).then(function (user) {
            res.status(200).jsonp(user);
        }, function (err) {
            return res.status(500).send(err.message);
        });
    });
};

// Delete a User with specified ID
UserController.deleteUser = function (req, res) {
    "use strict";

    userQuerier.findById(req.params.id).then(function (user) {
        userQuerier.remove(user).then(function () {
            res.status(200).jsonp(true);
        }, function (err) {
            return res.status(500).send(err.message);
        });
    });
};


/**
 *  ===============================
 *  ===== SCHEDULE OPERATIONS =====
 *  ===============================
 */

// Find an User's schedule
UserController.findUserSchedule = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(user.schedule);
    });
};

// Update an User's schedule
UserController.updateUserSchedule = function (req, res) {
    "use strict";
    console.log(req.body);
    console.log(req.params.id);

    User.findById(req.params.id, function (err, user) {
        user.schedule = req.body.schedule;

        user.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(user);
        });
    });
};

// Delete an User's schedule
UserController.deleteUserSchedule = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        user.schedule = [];
        user.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(true);
        });
    });
};


/**
 *  ===============================
 *  ==== WATCHROUND OPERATIONS ====
 *  ===============================
 */

// Find an User's watch round
UserController.findUserWatchRound = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(user.watchRound);
    });
};

// Update an User's watch round
UserController.updateUserWatchRound = function (req, res) {
    "use strict";
    console.log(req.body);
    console.log(req.params.id);

    User.findById(req.params.id, function (err, user) {
        user.watchRound = req.body.watchRound;

        user.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(user);
        });
    });
};

// Delete an User's watch round
UserController.deleteUserWatchRound = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        user.watchRound = -1;
        user.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(true);
        });
    });
};

module.exports = UserController;
