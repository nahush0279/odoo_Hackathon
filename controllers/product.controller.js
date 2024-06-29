import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import {ApiError} from "../utils/apiError.js"
import { uploadOnCloudinary } from "../utils/clodinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

const product = asyncHandler(async (req, res) => {
    // const {name, description, category, rentalPrice, location} = req.body
    const name = 'table'
    const description = 'table description'
    const category = 'homemade'
    const rentalPrice = 100
    const location = "gandhinagar"

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


export {
    product
}