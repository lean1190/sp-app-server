/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var express = require("express"),
    router = express.Router(),
    UserController = require("../controllers/UserController");

/* Basic user information */
router.get("/", UserController.findAll);
router.post("/", UserController.addUser);

router.get("/:id", UserController.findById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

router.get("/name/:name", UserController.findByName);

/* Schedule */
router.get("/:id/schedule", UserController.findUserSchedule);
router.put("/:id/schedule", UserController.updateUserSchedule);
router.delete("/:id/schedule", UserController.deleteUserSchedule);

router.get("/schedule/all", UserController.findAllUsersSchedule);

/* WatchRound */
router.get("/:id/watchround", UserController.findUserWatchRound);
router.put("/:id/watchround", UserController.updateUserWatchRound);
router.delete("/:id/watchround", UserController.deleteUserWatchRound);


module.exports = router;
