const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Login function for admin
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and if the user is an admin
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid email or not an admin' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch'); // Debugging log
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, name: user.name, role: user.role });
  } catch (error) {
    console.error('Error during login:', error); // Error log
    res.status(500).json({ message: error.message });
  }
};
