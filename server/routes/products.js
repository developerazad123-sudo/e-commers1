const express = require('express');
const multer = require('multer');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload
} = require('../controllers/productController');

const Product = require('../models/Product');

// Include other resource routers
// const reviewRouter = require('./reviews');

const router = express.Router();

// Protect and authorize middleware
const { protect, authorize } = require('../middleware/auth');

// Multer setup for file uploads
const upload = multer({ dest: 'public/uploads/' });

// Re-route into other resource routers
// router.use('/:productId/reviews', reviewRouter);

router.route('/')
  .get(getProducts)
  .post(protect, authorize('seller', 'admin'), createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('seller', 'admin'), updateProduct)
  .delete(protect, authorize('seller', 'admin'), deleteProduct);

router.route('/:id/photo')
  .put(protect, authorize('seller', 'admin'), upload.single('file'), productPhotoUpload);

module.exports = router;