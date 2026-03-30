const express = require("express");
const UserController = require("../../controllers/user-controller");
const router = express.Router();

const {AuthRequestValidator} = require("../../middlewares/index");

router.post(
    '/signup',
    AuthRequestValidator.validateUserAuth,
    UserController.create);

router.post(
    '/signin',
    AuthRequestValidator.validateUserAuth,
    UserController.signIn);


router.get('./isAuthenticated',UserController.isAuthenticated);

router.get(
    '/isAdmin', 
    AuthRequestValidator.validateIsAdminRequest,
    UserController.isAdnin);
module.exports= router;