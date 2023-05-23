const express = require("express");
const extraController = require("./../controllers/extraController");
const router = express.Router();

router.get("/Products", extraController.getProducts);
router.get("/Contact", extraController.getContact);
router.get("/", extraController.getHome);

module.exports = router;
