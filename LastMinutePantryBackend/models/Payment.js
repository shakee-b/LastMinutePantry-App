// models/Payment.js
const mongoose = require('mongoose');

// Payment Schema
const PaymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['verified', 'unverified'],
    default: 'unverified',
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
