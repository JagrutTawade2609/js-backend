import ProductModel from "../models/product.schema.js";
export const addProduct = async (req,res) => {
    try {
        const { name, price, desc, image, category, stock } = req.body // Extract the product details from the request body
        // Logic to add the product to the database or perform any necessary operations
        // For example, you can create a new product document and save it to the database
        // After adding the product, you can send a response back to the client indicating success
        if  (!name || !price || !desc || !image || !category || !stock) { // Check if all required fields are provided
            return res.status(400).json({ // If not, return a 400 Bad Request response with an error message
                message: 'Please provide all required fields: name, price, description, image, category, stock'
            });
        }
        const newProduct = new ProductModel({ 
            name: name, 
            price: price, 
            desc: desc, 
            image: image, 
            category: category, 
            stock: stock }); 
        // Create a new product object using the extracted details
        // Save the new product to the database
        // For example, you can use a Mongoose model to save the product
        // ProductModel.create(newProduct)
        await newProduct.save(); // Save the new product to the database
        res.status(200).json({ message: 'Product added successfully' })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the product', error: error.message })
    }
}

export const getProducts = async (req,res) => {
    try {
        // Logic to retrieve products from the database or perform any necessary operations
        // For example, you can query the database to get a list of products
        // After retrieving the products, you can send a response back to the client with the product data
        const products = await ProductModel.find() // Retrieve all products from the database
        res.status(200).json({ message: 'Products retrieved successfully', products: products })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the products', error: error.message })
    }
}   
    