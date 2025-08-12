// routes/notificationRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), notificationController.createNotification);
router.get('/', notificationController.getNotifications);
router.get('/:id', notificationController.getNotificationById);
router.put('/:id', upload.single('image'), notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
