const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

// Create a new delivery
router.post('/deliveries', deliveryController.createDelivery);

// Get all deliveries
router.get('/deliveries', deliveryController.getAllDeliveries);

// Get a specific delivery by ID
router.get('/deliveries/:id', deliveryController.getDeliveryById);

// Update a delivery by ID
router.put('/deliveries/:id', deliveryController.updateDelivery);

// Delete a delivery by ID
router.delete('/deliveries/:id', deliveryController.deleteDelivery);

module.exports = router;
