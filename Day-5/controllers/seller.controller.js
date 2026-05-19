import ProductModel from "../models/product.schema.js";
export const addProduct = async (req,res) => {
    try {
        const { name, price, desc, image, category, stock, userId} = req.body // Extract the product details from the request body
        // Logic to add the product to the database or perform any necessary operations
        // For example, you can create a new product document and save it to the database
        // After adding the product, you can send a response back to the client indicating success
        if  (!name || !price || !desc || !image || !category || !stock || !userId) { // Check if all required fields are provided
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
            stock: stock,
            seller: userId
        }); 
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
        const userId = req.query.userId; // Get the userId from the query parameters
        const products = await ProductModel.find({ seller: userId }).populate('seller', 'name email') // Retrieve products for the specific seller
        res.status(200).json({ message: 'Products retrieved successfully', products: products })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the products', error: error.message })
    }
}   
    export const updateProduct = async (req,res) => {
        try{
            const products = await ProductModel.find(); // Find the product by ID
            for(let i=0; i<products.length; i++){
                if(!products[i].seller){ // Check if the seller field is missing
                    console.log(products[i]);
                    await ProductModel.findByIdAndUpdate(products[i]._id, { seller: "6a0b678263260b479d8b2eb5" }) // Update the product with the seller information
                }
            }
            return res.status(200).json({ message: 'Product updated successfully', products: products })
        }catch(error){
            res.status(500).json({ message: 'An error occurred while updating the product', error: error.message })
        }
    }