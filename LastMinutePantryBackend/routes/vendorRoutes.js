// routes/vendorRoutes.js

const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Route for creating a vendor
router.post('/create', vendorController.createVendor);

// Route for getting all vendors
router.get('/', vendorController.getVendors);

// Route for getting a single vendor by ID
router.get('/:id', vendorController.getVendorById);

// Route for updating a vendor by ID
router.put('/:id', vendorController.updateVendor);

// Route for deleting a vendor by ID
router.delete('/:id', vendorController.deleteVendor);

module.exports = router;
