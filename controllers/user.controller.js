import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from 'mongoose';

const generateAccessAndrefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        console.log("access",accessToken, "refresh",refreshToken);
        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const createUser = asyncHandler(async(req, res) => {
    const name = 'Meet patel';
    const phone = '7778049568'
    const email = 'meetpokal04@gmail.com';
    const password = 'Meet@123';
    const role = 'Buyer'

    if(!email){
        throw new ApiError(400, 'Email is required');
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role
    })

    res
    .status(200)
    .json(
        new ApiResponse(200, user, "user created successfully")
    )
    
})

const loginUser = asyncHandler(async(req, res) => {
    const email = 'meetpokal04@gmail.com'
    const password = 'Meet@123'

    const user = await User.findOne({email})

    console.log(user);

    const isPasswordValid = user.isPasswordCorrect(password)

    console.log(isPasswordValid);

    if(!isPasswordValid){
        throw new ApiError(400, "invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndrefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(" -password -refreshToken ")

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            }, "user loggedIn successfully  "
        )
    )
})

const getDetail = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id).select("-password")

    if(!user){
        throw new ApiError(400, "Not Found")
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, user, "User fetched successfully")
    )
})

const updateDetails = asyncHandler(async(req, res) => {
    // const { name, phone, email } = req.body
    const name = 'meet';
    const phone = '1234567890';
    const email = 'meet@gmail.com';

    if(!(name && phone && email)){
        throw new ApiError(400, "Please provide all the details")
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                name,
                email,
                phone
            }
        },
        {new:true}, //return the updated document
    ).select("-password");

    if(!updatedUser){
        throw new ApiError(400, "Something went wrong while updating")
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, updatedUser, "user updated successfully")
    )
})

export{
    createUser,
    loginUser,
    getDetail,
    updateDetails
}