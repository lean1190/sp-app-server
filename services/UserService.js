/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module, console */

require("../models/User");

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    GenericMongooseWrapper = require("../utils/GenericMongooseWrapper"),
    userQuerier = new GenericMongooseWrapper("User", "../models/User"),
    utilsHelper = require("../utils/UtilsHelper");

var UserService = {},
    self = UserService;

/**
 *  ===============================
 *  ==== BASIC USER OPERATIONS ====
 *  ===============================
 */

// Remove the image resize parameter after the extension
// Google set it to the profile photo
UserService.removeImageSize = function(imageUrl) {
    var parametersPosition = imageUrl.indexOf('?');

    return imageUrl.substring(0, parametersPosition != -1 ? parametersPosition : imageUrl.length);
};

// Return all users
UserService.findAll = function () {
    "use strict";

    return userQuerier.find();
};

// Return a User with specified ID
UserService.findById = function (userId) {
    "use strict";

    return userQuerier.findById(userId);
};

// Return a User with specified name
UserService.findByName = function (name) {
    "use strict";

    return userQuerier.find({
        name: name
    });
};

// Add a new User
UserService.addUser = function (reqUser) {
    "use strict";

    reqUser.watchRound = -1;
    reqUser.schedule = [];
    var newUser = new User(reqUser);

    return userQuerier.save(newUser).then(function(user) {
        return user[0];
    }, function(err) {
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

        return userQuerier.save(user);
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
UserService.findOrCreateUserWithGoogleProfile = function (googleProfile, accessToken, refreshToken) {
    "use strict";

    return userQuerier.findOne({
        googleId: googleProfile.id
    }).then(function (user) {
        if (utilsHelper.isEmpty(user)) {
            var profilePhoto = self.removeImageSize(googleProfile.photos[0].value);
            return self.addUser({
                googleId: googleProfile.id,
                name: googleProfile.displayName,
                phone: 15444999,
                email: googleProfile.emails[0].value,
                profilePhoto: profilePhoto,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } else {
            return user;
        }
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
