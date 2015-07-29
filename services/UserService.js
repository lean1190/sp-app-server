/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, exports, console */

var mongoose = require("mongoose");
var User = mongoose.model("User");

/**
 *  ===============================
 *  ==== BASIC USER OPERATIONS ====
 *  ===============================
 */

// Return all users
exports.findAll = function (req, res) {
    "use strict";
    User.find(function (err, users) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(users);
    });
};


// Return a User with specified ID
exports.findById = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(user);
    });
};

// Return a User with specified name
exports.findByName = function (req, res) {
    "use strict";
    User.find({
        name: req.body.name
    }, function (err, user) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(user);
    });
};

// Add a new User
exports.addUser = function (req, res) {
    "use strict";
    console.log(req.body);

    var newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        watchRound: -1,
        schedule: []
    });

    newUser.save(function (err, user) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(user);
    });
};

// Update an existing User
exports.updateUser = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.email = req.body.email;

        user.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(user);
        });
    });
};

// Delete a User with specified ID
exports.deleteUser = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        user.remove(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(true);
        });
    });
};


/**
 *  ===============================
 *  ===== SCHEDULE OPERATIONS =====
 *  ===============================
 */

// Find an User's schedule
exports.findUserSchedule = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(user.schedule);
    });
};

// Update an User's schedule
exports.updateUserSchedule = function (req, res) {
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
exports.deleteUserSchedule = function (req, res) {
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

/* WatchRound */
/*
router.get("/:id/watchround", UserService.findUserWatchRound);
router.post("/:id/watchround", UserService.addUserWatchRound);

router.put("/:id/watchround", UserService.updateUserWatchRound);
router.delete("/:id/watchround", UserService.deleteUserWatchRound);
*/
