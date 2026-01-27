const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../public/uploads/');
    
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create custom filename to prevent conflicts
    cb(null, `photo_${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`);
  }
});

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer setup for file uploads
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: process.env.MAX_FILE_UPLOAD || 1000000 // Limit file size to 1MB by default
  },
  fileFilter: fileFilter
});

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