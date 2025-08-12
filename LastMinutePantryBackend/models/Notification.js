// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  shopDetails: {
    type: String,
    required: true,
  },
  image: {
    type: String, // will store the path of the uploaded image
  },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
