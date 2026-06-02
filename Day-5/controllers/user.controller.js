import UserModel from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CartModel from "../models/cart.schema.js";
import OrderModel from "../models/order.schema.js";
import ProductModel from "../models/product.schema.js";
export const Profile = (req, res) => {
  try {
    const userId = req.userId;
    const userData = req.userData;
    console.log(userId, "userId");
    console.log(userData, "userData");
    userData.password = req.userPassword;
    return res.status(200).json({ success: true, profileData: userData });
    res.send(true);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    console.log(req.userId, "UPDATE USER ID");
    console.log(req.body);
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const { name, email, password } = req.body;

    const userData = {};

    if (name) userData.name = name;
    if (email) userData.email = email;
    if (password) userData.password = await bcrypt.hash(password, 10);

    // console.log(userData, "userData");

    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    const userNewData = {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      profileData: updatedUser,
      success: true,
      userData: userNewData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};



export const deleteProfile = async (req,res) => {
    try {
        const { id } = req.params
        await UserModel.findByIdAndDelete(id)
        res.json({ message: `User profile with id ${id} deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the profile', error: error.message })
    }
}

export const Cart = async(req,res) => {
    try {
        const { productId, quantity } = req.body; // Extract the product ID and quantity from the request body
        const userId = req.userId; // Get the user ID from the authenticated user (assuming you have authentication middleware in place)
        // Logic to add the specified product and quantity to the user's cart in the database
        // For example, you can find the user by their ID and update their cart with the new product and quantity
        // After adding to the cart, you can send a response back to the client confirming that the product has been added to the cart
        if (!productId || !quantity) { // Check if both product ID and quantity are provided
            return res.status(400).json({ // If not, return a 400 Bad Request response with an error message
                success: false,
                message: 'Please provide both productId and quantity in the request body' 
            });
        }
        const existingCart = await CartModel.findOne({ user: userId });
            if (existingCart){
              existingCart.products.push({ product: productId, quantity });
              await existingCart.save();
              return res.status(200).json({ success: true, message: `Product with ID ${productId} and quantity ${quantity} added to cart for user with ID ${userId}` })  
            }else {
              const newCart = new CartModel({
                user: userId,
                products: [{ product: productId, quantity }]
              });
              await newCart.save(); 
            }
            return res.status(200).json({ success: true, message: `Product with ID ${productId} and quantity ${quantity} added to cart for user with ID ${userId}` })
          }catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while adding the product to the cart', error: error.message })
    }
  
}

export const GetCartProducts = async(req,res) => {
    try {
        const userId = req.userId; // Get the user ID from the authenticated user (assuming you have authentication middleware in place)
        // Logic to retrieve the products in the user's cart from the database
        // For example, you can find the user's cart by their ID and populate the product details for each item in the cart
        // After retrieving the cart products, you can send a response back to the client with the cart details
        const cart = await CartModel.findOne({ user: userId }).populate('products.product');
        if (!cart) { // Check if a cart exists for the user
            return res.status(404).json({ // If not, return a 404 Not Found response with an error message
                success: false,
                message: 'Cart not found for this user' 
            });
        }
        return res.status(200).json({ success: true, message: `Cart products retrieved successfully for user with ID ${userId}`, cartProducts: cart.products })
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while retrieving the cart products', error: error.message })
         console.log(error)
    }
} 
export const CreateCheckoutSession = async (req,res) => {
    try {

        console.log("CHECKOUT API HIT");

        const userId = req.userId;

        const {finalPrice, appliedCoupon, discount} = req.body;

        const cart = await CartModel.findOne({
            user: userId
        }).populate("products.product");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found for this user"
            });
        }

        // Check Product Stock
        for (let i=0; i<cart.products.length; i++) {

            const item = cart.products[i];

            const product = await ProductModel.findById(item.product._id);

            if (product) {

                if (product.stock < item.quantity) {

                    const index = cart.products.findIndex(
                        (p) => p.product._id.toString() === item.product._id.toString()
                    );

                    if (index > -1) {
                        cart.products.splice(index,1);
                    }

                    await cart.save();

                    return res.status(400).json({
                        success: false,
                        message: `${product.name} is out of stock`
                    });
                }
            }
        }

        // Create Order
        const newOrder = new OrderModel({
            user: userId,

            products: cart.products.map((item) => ({
                product: item.product._id,
                quantity: item.quantity
            })),

            totalAmount: finalPrice,

            appliedCoupon,

            discount
        });

        await newOrder.save();

        console.log("ORDER PLACED => ", newOrder);

        // Reduce Product Stock
        for (let i=0; i<cart.products.length; i++) {

            const item = cart.products[i];

            const product = await ProductModel.findById(item.product._id);

            if (product) {

                product.stock = product.stock - item.quantity;

                await product.save();
            }
        }

        // Empty Cart
        cart.products = [];

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Checkout completed successfully",
            order: newOrder
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while creating checkout",
            error: error.message
        });
    }
}

export const UpdateCartQuantity = async (
  req,
  res
) => {
  try {

    const { productId, type } = req.body;

    const userId = req.userId;

    console.log(req.body);

    const cart = await CartModel.findOne({
      user: userId,
    });

    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find Product
    const product = cart.products.find(
      (item) =>
        item.product.toString() ===
        productId
    );

    if (!product) {

      return res.status(404).json({
        success: false,
        message:
          "Product not found in cart",
      });
    }

    // Increase
    if (type === "increase") {

      product.quantity += 1;
    }

    // Decrease
    if (type === "decrease") {

      if (product.quantity > 1) {

        product.quantity -= 1;
      }
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message:
        "Quantity updated successfully",
      cart,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Error updating quantity",
      error: error.message,
    });
  }
};

export const GetOrders = async (req,res) => {
    try {
        const userId = req.userId;
        const orders = await OrderModel.find({ user: userId }).populate("products.product");
        return res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving orders",
            error: error.message
        });
    }
}