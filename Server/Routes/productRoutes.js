const express = require("express");

const { auth } = require("./../util/auth");
const productController = require("./../controllers/productController");

const router = express.Router();

router.get("/create", auth, productController.getCreateProduct);
router.post("/create", auth, productController.postCreateProduct);
router.get("/", productController.getAllProducts);
module.exports = router;
