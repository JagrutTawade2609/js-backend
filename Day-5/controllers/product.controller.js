import ProductModel from "../models/product.schema.js";

export const SortProducts = async(req,res) => {
    try {
        const { sortBy, sortOrder } = req.query; // Extract the sortBy and sortOrder query parameters from the request
        // Logic to sort the products based on the provided sortBy and sortOrder parameters
        // For example, you can use a database query to fetch and sort the products accordingly
        // After sorting, you can send a response back to the client with the sorted product data
        if (!sortBy || !sortOrder) {// Check if both sortBy and sortOrder query parameters are provided
            return res.status(400).json({ // If not, return a 400 Bad Request response with an error message
                message: 'Please provide both sortBy and sortOrder query parameters' 
            });
        }
        const sortFilter = {}; // Initialize an empty object to hold the sorting criteria
        sortFilter[sortBy] = sortOrder === 'asc' ? 1 : -1;// Example: { price: 1 } for ascending sort by price, { price: -1 } for descending sort by price
        console.log(sortFilter);
        const products = await ProductModel.find().sort(sortFilter); // Fetch and sort the products from the database using the sortFilter
        return res.status(200).json({ message: `Products sorted by ${sortBy} in ${sortOrder} order`, sortedProducts: products })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while sorting the products', error: error.message })
    }
};

export const paginateProducts = async(req,res) => {
    try {
        const { page } = req.query;
        const limit = 5; // You can set a default limit or extract it from the query parameters as well 
        // Extract the page and limit query parameters from the request
        // Logic to paginate the products based on the provided page and limit parameters
        // For example, you can use a database query with skip and limit to fetch the appropriate set of products for the requested page
        // After paginating, you can send a response back to the client with the paginated product data
        if (!page || !limit) { // Check if both page and limit query parameters are provided
            return res.status(400).json({ // If not, return a 400 Bad Request response with an error message
                message: 'Please provide both page and limit query parameters' 
            });
        }
        const skip = (page - 1) * limit; // Calculate the number of documents to skip based on the current page and limit
        const products = await ProductModel.find().skip(skip).limit(Number(limit)); // Fetch the paginated products from the database using skip and limit
        return res.status(200).json({ message: `Products paginated for page ${page} with limit ${limit}`, paginatedProducts: products })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while paginating the products', error: error.message })
    }
}

export const searchProducts = async(req,res) => {
    try {
        const { query } = req.query; // Extract the search query from the request query parameters
        // Logic to search for products based on the provided query parameter
        // For example, you can use a database query with a regex or text search to find products that match the search query
        // After searching, you can send a response back to the client with the search results
        if (!query) { // Check if the search query parameter is provided
            return res.status(400).json({ // If not, return a 400 Bad Request response with an error message
                message: 'Please provide a search query parameter' 
            });
        }
        const products = await ProductModel.find({ name: { $regex: query, $options: 'i' } }); // Search for products in the database using a case-insensitive regex match on the name field
        return res.status(200).json({ message: `Products matching search query "${query}"`, searchResults: products })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while searching for products', error: error.message })
    }
}