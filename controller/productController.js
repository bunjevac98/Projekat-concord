const Product = require('../Models/product');

module.exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, category } = req.body;
        const newProduct = new Product({
            name, price, category
        });
        await newProduct.save();
        res.status(201).json("Product created successfully");
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
}

module.exports.getProduct = async (req, res, next) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No product found' });
        }
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}


module.exports.updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" }); // Corrected error message
        }

        res.status(200).json(updatedProduct); // Sending the updated product in the response
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
    next();
}

module.exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}






