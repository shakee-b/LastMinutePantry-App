// controllers/notificationController.js
const Notification = require('../models/Notification');
const fs = require('fs');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { description, itemName, userRole, expiryDate, shopDetails } = req.body;
    const image = req.file ? req.file.path : null;

    const notification = new Notification({
      description,
      itemName,
      userRole,
      expiryDate,
      shopDetails,
      image,
    });

    await notification.save();
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error });
  }
};

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notification', error });
  }
};

// Update a notification
exports.updateNotification = async (req, res) => {
  try {
    const { description, itemName, userRole, expiryDate, shopDetails } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedData = {
      description,
      itemName,
      userRole,
      expiryDate,
      shopDetails,
    };

    if (image) {
      updatedData.image = image;
    }

    const notification = await Notification.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json({ message: 'Notification updated successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    // Delete the image file if exists
    if (notification.image) {
      fs.unlink(notification.image, (err) => {
        if (err) console.log('Error deleting image:', err);
      });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error });
  }
};
