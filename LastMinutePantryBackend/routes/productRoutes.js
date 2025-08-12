//routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// Configure multer for image upload
const upload = multer({ dest: 'uploads/' });

router.post('/create', upload.fields([{ name: 'image', maxCount: 1 }]), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }]), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
