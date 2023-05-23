const express = require("express");

const userController = require("./../controllers/userController");

const router = express.Router();

router.get("/login", userController.getLogin);

router.post("/login", userController.postLogin);

router.get("/signup", userController.getCreateUser);

router.post("/signup", userController.postCreateUser);

module.exports = router;
