const express = require("express");

const productController = require("./../controllers/productController");

const router = express.Router();

router.get("/create", productController.getCreateProduct);
router.get("/", productController.getCreateProduct);
module.exports = router;
