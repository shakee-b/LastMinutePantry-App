// controllers/paymentController.js
const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { paymentId, productName, dueDate, time, totalAmount, status } = req.body;

    const payment = new Payment({
      paymentId,
      productName,
      dueDate,
      time,
      totalAmount,
      status,
    });

    await payment.save();
    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error });
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const { productName, dueDate, time, totalAmount, status } = req.body;

    const updatedData = {
      productName,
      dueDate,
      time,
      totalAmount,
      status,
    };

    const payment = await Payment.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error });
  }
};
