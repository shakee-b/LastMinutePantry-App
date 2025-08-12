const Delivery = require('../models/Delivery');

// Create a new delivery
exports.createDelivery = async (req, res) => {
    try {
        const { deliveryId, items, address, postalCode, status, date, nic, deliveryNote } = req.body;

        const delivery = new Delivery({
            deliveryId,
            items,
            address,
            postalCode,
            status,
            date,
            nic,
            deliveryNote
        });

        const savedDelivery = await delivery.save();
        res.status(201).json(savedDelivery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all deliveries
exports.getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json(deliveries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a delivery by ID
exports.getDeliveryById = async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id);
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
        res.status(200).json(delivery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a delivery
exports.updateDelivery = async (req, res) => {
    try {
        const { deliveryId, items, address, postalCode, status, date, nic, deliveryNote } = req.body;

        const updatedDelivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            { deliveryId, items, address, postalCode, status, date, nic, deliveryNote },
            { new: true }
        );

        if (!updatedDelivery) return res.status(404).json({ message: 'Delivery not found' });
        
        res.status(200).json(updatedDelivery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a delivery
exports.deleteDelivery = async (req, res) => {
    try {
        const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
        if (!deletedDelivery) return res.status(404).json({ message: 'Delivery not found' });
        res.status(200).json({ message: 'Delivery deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
