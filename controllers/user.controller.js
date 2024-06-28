import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from 'mongoose';

const createUser = asyncHandler(async(req, res) => {
    // const username = 'Meet Pokal';
    // const email = 'meetpokal04@gmail.com';
    // const password = 'Meet@123';

    // if(!email){
    //     throw new ApiError(400, 'Email is required');
    // }

    // const user = await User.create({
    //     username,
    //     email,
    //     password
    // })

    // console.log(user);
    console.log("Hello");
})

export{
    createUser
}