/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/User");

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    GenericMongooseWrapper = require("../utils/GenericMongooseWrapper"),
    userQuerier = new GenericMongooseWrapper("User", "../models/User"),
    utilsHelper = require("../utils/UtilsHelper");

var UserService = {};

/**
 *  ===============================
 *  ==== BASIC USER OPERATIONS ====
 *  ===============================
 */

// Return all users
UserService.findAll = function () {
    "use strict";
    userQuerier.find().then(function (users) {
        return users;
    }, function (err) {
        return err;
    });
};

// Return a User with specified ID
UserService.findById = function (userId) {
    "use strict";
    userQuerier.findById(userId).then(function (user) {
        return user;
    }, function (err) {
        return err;
    });
};

// Return a User with specified name
UserService.findByName = function (name) {
    "use strict";
    userQuerier.find({
        name: name
    }).then(function (user) {
        return user;
    }, function (err) {
        return err;
    });
};

// Add a new User
UserService.addUser = function (reqUser) {
    "use strict";

    var newUser = new User({
        googleId: reqUser.googleId,
        name: reqUser.name,
        phone: reqUser.phone,
        email: reqUser.email,
        watchRound: -1,
        schedule: []
    });

    userQuerier.save(newUser).then(function (user) {
        return user;
    }, function (err) {
        return err;
    });
};

// Update an existing User
UserService.updateUser = function (reqUser) {
    "use strict";

    userQuerier.findById(reqUser.id).then(function (user) {
        user.name = reqUser.name || user.name;
        user.phone = reqUser.phone || user.phone;
        user.email = reqUser.email || user.email;

        userQuerier.save(user).then(function (user) {
            return user;
        }, function (err) {
            return err;
        });
    });
};

// Delete a User with specified ID
UserService.deleteUser = function (userId) {
    "use strict";

    userQuerier.findById(userId).then(function (user) {
        userQuerier.remove(user).then(function () {
            return true;
        }, function (err) {
            return err;
        });
    });
};

// Find or create a user based on its Google id
UserService.findOrCreateUser = function (googleProfile) {
    "use strict";

    userQuerier.find({
        googleId: googleProfile.id
    }).then(function (user) {
        if (utilsHelper.isEmpty(user)) {
            UserService.addUser({
                googleId: googleProfile.id,
                name: googleProfile.displayName,
                phone: 15444999,
                email: googleProfile.emails[0].value
            }).then(function (newUser) {
                user = newUser;
            });
        }

        return user;
    }, function (err) {
        return err;
    });
};


/**
 *  ===============================
 *  ===== SCHEDULE OPERATIONS =====
 *  ===============================
 */

// Find an User's schedule
UserService.findUserSchedule = function (userId) {
    "use strict";
    User.findById(userId, function (err, user) {
        if (err) {
            return err;
        }

        return user.schedule;
    });
};

// Update an User's schedule
UserService.updateUserSchedule = function (req, res) {
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
UserService.deleteUserSchedule = function (req, res) {
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
UserService.findUserWatchRound = function (req, res) {
    "use strict";
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(user.watchRound);
    });
};

// Update an User's watch round
UserService.updateUserWatchRound = function (req, res) {
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
UserService.deleteUserWatchRound = function (req, res) {
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

module.exports = UserService;
