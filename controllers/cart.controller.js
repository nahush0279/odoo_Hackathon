import { asyncHandler } from '../utils/asyncHandler.js';
import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import mongoose from 'mongoose';

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    // const productId = "667fcc0089b441b1c7f44055"
    // const quantity = 1
    const userId = req.user._id;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json(new ApiResponse(400, {}, 'Valid productId is required'));
    }

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(400).json(new ApiResponse(400, {}, 'Product not found'));
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, products: [{ product: productId, quantity }] });
    } else {
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
    }

    await cart.save();

    res.status(200).json(new ApiResponse(200, cart, 'Product added to cart successfully'));
});

const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart) {
        return res.status(404).json(new ApiResponse(404, {}, 'Cart not found'));
    }

    res.status(200).json(new ApiResponse(200, cart, 'Cart retrieved successfully'));
});

export { 
    addToCart,
    getCart 
};

