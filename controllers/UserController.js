/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var express = require("express");
var router = express.Router();
var UserService = require("../services/UserService");

/* Basic user information */
router.get("/", UserService.findAll);
router.post("/", UserService.addUser);

router.get("/:id", UserService.findById);
router.get("/:name", UserService.findByName);
router.put("/:id", UserService.updateUser);
router.delete("/:id", UserService.deleteUser);

/* Schedule */
router.get("/:id/schedule", UserService.findUserSchedule);
router.put("/:id/schedule", UserService.updateUserSchedule);
router.delete("/:id/schedule", UserService.deleteUserSchedule);

/* WatchRound */
/*router.get("/:id/watchround", UserService.findUserWatchRound);
router.post("/:id/watchround", UserService.addUserWatchRound);

router.put("/:id/watchround", UserService.updateUserWatchRound);
router.delete("/:id/watchround", UserService.deleteUserWatchRound);*/


module.exports = router;
