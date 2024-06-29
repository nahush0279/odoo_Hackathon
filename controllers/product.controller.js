import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import {ApiError} from "../utils/apiError.js"
import { uploadOnCloudinary } from "../utils/clodinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

const product = asyncHandler(async (req, res) => {
    const {name, description, category, rentalPrice, location} = req.body

    if(!(name && description && category && rentalPrice && location)){
        return res.status(400).json(
            new ApiResponse(400, {}, "All inputs fields are required")
        );
    }
    
    const imageLocalPath1 = req.files?.image1[0]?.path;

    const imageLocalPath2 = req.files?.image2[0]?.path;

    const imageLocalPath3 = req.files?.image3[0]?.path;

    const imageLocalPath4 = req.files?.image4[0]?.path;

    if(!imageLocalPath1){
        return res.status(400).json(
            new ApiResponse(400, {}, "Image1 file required")
        );
    }
    if(!imageLocalPath2){
        return res.status(400).json(
            new ApiResponse(400, {}, "Image2 file required")
        );
    }
    if(!imageLocalPath3){
        return res.status(400).json(
            new ApiResponse(400, {}, "Image3 file required")
        );
    }
    if(!imageLocalPath4){
        return res.status(400).json(
            new ApiResponse(400, {}, "Image4 file required")
        );
    }

    const IMAGES1 = await uploadOnCloudinary(imageLocalPath1);
    const IMAGES2 = await uploadOnCloudinary(imageLocalPath2);
    const IMAGES3 = await uploadOnCloudinary(imageLocalPath3);
    const IMAGES4 = await uploadOnCloudinary(imageLocalPath4);
    

    if(!IMAGES1){
        return res.status(400).json(
            new ApiResponse(400, {}, "something went wrong while uploading image1")
        );
    }
    if(!IMAGES2){
        return res.status(400).json(
            new ApiResponse(400, {}, "something went wrong while uploading image2")
        );
    }
    if(!IMAGES3){
        return res.status(400).json(
            new ApiResponse(400, {}, "something went wrong while uploading image3")
        );
    }
    if(!IMAGES4){
        return res.status(400).json(
            new ApiResponse(400, {}, "something went wrong while uploading image4")
        );
    }

    const product = await Product.create({
        name,
        description,
        category,
        rentalPrice,
        image1: IMAGES1.url,
        image2: IMAGES2.url,
        image3: IMAGES3.url,
        image4: IMAGES4.url,
        location,
        owner: req.user?._id
    })

    res
    .status(200)
    .json(
        new ApiResponse(200, product, "Product added successfully")
    )
}) 

const updateProduct = asyncHandler(async(req, res) => {
    const { productId } = req.params

    if(!productId){
        return res.status(400).json(
            new ApiResponse(400, {}, "productId is required")
        )
    }
    const product = await Product.findById(productId)

    if(!product){
        return res.status(400).json(
            new ApiResponse(400, {}, "Product not found")
        )
    }

    const { name, description, category, rentalPrice,location } = req.body;

    if(!(name && description && category && rentalPrice && location)){
        return res.status(400).json(
            new ApiResponse(400, {}, "Enter all the values")
        );
    }

    const imageLocalPath5 = req.files?.image1[0]?.path;

    const imageLocalPath6 = req.files?.image2[0]?.path;

    const imageLocalPath7 = req.files?.image3[0]?.path;

    const imageLocalPath8 = req.files?.image4[0]?.path;

    if(!imageLocalPath5){
        return res.status(400).json(
            new ApiResponse(400, {}, "Image1 file required")
        );
    }
    if(!imageLocalPath6){
        return res.status(400).json(
            new ApiResponse(400, {}, "Image2 file required")
        );
    }
    if(!imageLocalPath7){
        return res.status(400).json(
            new ApiResponse(400, {}, "Image3 file required")
        );
    }
    if(!imageLocalPath8){
        return res.status(400).json(
            new ApiResponse(400, {}, "Image4 file required")
        );
    }

    const IMAGES5 = await uploadOnCloudinary(imageLocalPath5);
    const IMAGES6 = await uploadOnCloudinary(imageLocalPath6);
    const IMAGES7 = await uploadOnCloudinary(imageLocalPath7);
    const IMAGES8 = await uploadOnCloudinary(imageLocalPath8);
    

    if(!IMAGES5){
        return res.status(400).json(
            new ApiResponse(400, {}, "something went wrong while uploading image1")
        );
    }
    if(!IMAGES6){
        return res.status(400).json(
            new ApiResponse(400, {}, "something went wrong while uploading image2")
        );
    }
    if(!IMAGES7){
        return res.status(400).json(
            new ApiResponse(400, {}, "something went wrong while uploading image3")
        );
    }
    if(!IMAGES8){
        return res.status(400).json(
            new ApiResponse(400, {}, "something went wrong while uploading image4")
        );
    }

    const updatedproduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                name,
                description,
                category,
                rentalPrice,
                location,
                image1: IMAGES5.url,
                image2: IMAGES6.url,
                image3: IMAGES7.url,
                image4: IMAGES8.url
            }
        },
        {new: true}
    )
    
    if(!updatedproduct){
        return res.status(400).json(
            new ApiResponse(400, {}, "Something went wrong while updating")
        );
    }
    res
    .status(200)
    .json(
        new ApiResponse(200, updatedproduct, "user updated successfully")
    )

})

const getAllProduct = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find();
        
        res.status(200).json(
            new ApiResponse(200, products, "Products retrieved successfully")
        );
    } catch (error) {
        res.status(500).json(
            new ApiResponse(500, {}, "An error occurred while retrieving products")
        );
    }
})

const deleteProduct = asyncHandler(async(req, res) => {
    const { productId } = req.params
    if(!productId){
        return res.status(400).json(
            new ApiResponse(400, {}, "Product Id is required")
        );
    }
    const product = await Product.findById(productId)

    if (!product){
        return res.status(400).json(
            new ApiResponse(400, {}, "Product not found")
        )
    }
    const deletedproduct = await Product.findByIdAndDelete(productId)
    res.status(400).json(

        new ApiResponse(400, deletedproduct, "Product deleted")
    )
})

const searchProducts = asyncHandler(async (req, res) => {
    const { name, description, category, minRentalPrice, maxRentalPrice, location, owner } = req.query;
    let query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    if (description) {
        query.description = { $regex: description, $options: 'i' };
    }

    if (category) {
        query.category = category;
    }

    if (minRentalPrice) {
        query.rentalPrice = { ...query.rentalPrice, $gte: minRentalPrice };
    }

    if (maxRentalPrice) {
        query.rentalPrice = { ...query.rentalPrice, $lte: maxRentalPrice };
    }

    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }

    if (owner) {
        query.owner = owner;
    }

    const products = await Product.find(query);

    res.status(200).json(new ApiResponse(200, products, 'Products retrieved successfully'));
});

const filter = asyncHandler(async(req, res) => {
    
})



export {
    product,
    updateProduct,
    getAllProduct,
    deleteProduct,
    searchProducts
}