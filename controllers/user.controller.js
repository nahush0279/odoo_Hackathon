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
    // const {name, phone, email, password, role, gender} = req.body
    const name = 'yash shah'
    const phone = '77780495674'
    const password = 'Yash@123'
    const email = 'yashshah04@gmail.com'
    const role = 'Buyer'
    const gender = true


    if (!(name && phone && email && password && role)) {
        return res.status(400).json(
            new ApiResponse(400, {}, "provide all the input fields")
        );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json(
            new ApiResponse(400, {}, "Email already exist")
        );
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
        gender
    })

    res
    .status(200)
    .json(
        new ApiResponse(200, user, "user created successfully")
    )
    
})

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    if(!(email && password)){
        return res.status(400).json(
            new ApiResponse(400, {}, "Provide email and password")
        );
    }

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json(
            new ApiResponse(400, {}, "User not found")
        );
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        return res.status(400).json(
            new ApiResponse(400, {}, "Password is incorrect")
        );
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

const updateDetails = asyncHandler(async(req, res) => {
    // const { name, phone, email } = req.body
    const {name, phone, email, gender} = req.body

    if(!(name && phone && email && gender)){
        return res.status(400).json(
            new ApiResponse(400, {}, "provide input firlds. name, email, phone")
        );
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                name,
                email,
                phone, 
                gender
            }
        },
        {new:true}, //return the updated document
    ).select("-password");

    if(!updatedUser){
        return res.status(400).json(
            new ApiResponse(400, {}, "Something went wrong while updating")
        );
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
    updateDetails
}