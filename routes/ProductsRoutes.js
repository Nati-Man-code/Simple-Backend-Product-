const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const { productValidator } = require("../middleware/ProductValidator");
const { adminValidator } = require("../middleware/adminValidator");
const { protect } = require("../middleware/authMiddleware");
const {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductControllers");

router
  .route("/")
  .get(protect, getProducts)
  .post(protect, productValidator, createProduct);
router.route("/:id").put(protect, updateProduct).delete(protect, deleteProduct);

// for admin
router.get("/getAllProducts", protect, adminValidator, getAllProducts);

module.exports = router;




