const express = require('express');
const router = express.Router();
const product = require("../controller/productController")
const catchAsync = require('../utils/catchAsync');
const { authenticate } = require("../middleware/authenticate")
const { isAdmin } = require("../middleware/autorization")

router.route('/')
    .get(authenticate, catchAsync(product.getProduct))
    .post(authenticate, isAdmin, catchAsync(product.createProduct))

router.route('/:id')
    .put(authenticate, isAdmin, catchAsync(product.updateProduct))
    .delete(authenticate, isAdmin, catchAsync(product.deleteProduct))

module.exports = router;