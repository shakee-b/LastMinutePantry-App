const Product = require('../models/Products');


// Create a new product
exports.createProduct = async (req, res) => {
    try {
        // Check the request body and log all fields received
        console.log('Request body:', req.body);

        // Access form data fields
        const { productName, price, stock, expiryDate } = req.body;

        // Check if expiryDate is being correctly received
        console.log('Received expiryDate:', expiryDate);

        const image = req.file ? req.file.path : null;

        // Convert expiryDate to a Date object
        const parsedExpiryDate = new Date(expiryDate);
        if (isNaN(parsedExpiryDate.getTime())) {
            console.log('Invalid expiryDate:', expiryDate); // Debug invalid date formats
            return res.status(400).json({ error: 'Invalid expiry date format' });
        }

        const product = new Product({
            productName,
            price,
            stock,
            expiryDate: parsedExpiryDate,
            image,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error('Error saving product:', err.message);
        res.status(500).json({ error: err.message });
    }
};



// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { productName, price, stock, expiryDate } = req.body;
        const image = req.file ? req.file.path : null;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { productName, price, stock, expiryDate, image },
            { new: true }
        );
        
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
