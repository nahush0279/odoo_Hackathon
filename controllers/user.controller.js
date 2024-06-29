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
    const username = 'Meet Pokal';
    const email = 'meetpokal04@gmail.com';
    const password = 'Meet@123';

    if(!email){
        throw new ApiError(400, 'Email is required');
    }

    const user = await User.create({
        username,
        email,
        password
    })

    res
    .status(200)
    .json(
        new ApiResponse(200, user, "user created successfully")
    )
    
})

const loginUser = asyncHandler(async(req, res) => {
    const email = 'meetpokal04@gmail.com'
    const password = 'Meet@0326'

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

export{
    createUser,
    loginUser
}