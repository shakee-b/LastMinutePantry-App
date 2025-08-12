const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['customer', 'vendor', 'admin', 'driver'],
    default: 'customer',
  },
  createdAt: { type: Date, default: Date.now },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  try {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Method to compare the entered password with the hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

