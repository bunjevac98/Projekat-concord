const express = require('express');
const router = express.Router();
const users = require("../controller/userController");
const authController = require("../controller/authController");
const catchAsync = require('../utils/catchAsync');
const { authenticate } = require("../middleware/authenticate")
const { isAdmin } = require("../middleware/autorization")


router.route('/')
    .get(authenticate, isAdmin, catchAsync(users.seeAllUsers))

router.route("/profile")
    .get(authenticate, users.seeProfile)

router.route('/signup')
    .post(authController.signup)

router.route('/login')
    .post(authController.login)

router.route('/:id')
    .put(authenticate, catchAsync(users.updateUser))
    .delete(authenticate, isAdmin, catchAsync(users.deleteUser))


module.exports = router;