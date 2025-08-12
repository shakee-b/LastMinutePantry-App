const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const deliverySchema = new mongoose.Schema({
    deliveryId: { type: Number }, // Will be auto-incremented
    items: [{ type: String, required: true }],
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
    date: { type: Date, default: Date.now },
    nic: { type: String, required: true },
    deliveryNote: { type: String }
});

// Auto-increment deliveryId
deliverySchema.plugin(AutoIncrement, { inc_field: 'deliveryId' });

module.exports = mongoose.model('Delivery', deliverySchema);
