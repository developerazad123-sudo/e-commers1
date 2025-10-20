const express = require('express');
const { 
  getSellerContactMessages, 
  sendContactResponse,
  getSellerContactResponses
} = require('../controllers/sellerContactController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Seller contact routes (protected for sellers)
router.route('/')
  .get(protect, authorize('seller'), getSellerContactMessages);

router.route('/:id/response')
  .post(protect, authorize('seller'), sendContactResponse);

router.route('/responses')
  .get(protect, authorize('seller'), getSellerContactResponses);

module.exports = router;