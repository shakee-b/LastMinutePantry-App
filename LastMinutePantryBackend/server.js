const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const vendorController = require('./controllers/vendorController');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const router = express.Router();



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/vendors', vendorRoutes);
app.use('/products', productRoutes);
app.use('/deliveries', deliveryRoutes);
app.use('/payments', paymentRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoutes);
app.use('/notifications', notificationRoutes);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection failed:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


