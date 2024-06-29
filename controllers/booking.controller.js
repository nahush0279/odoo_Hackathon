import { asyncHandler } from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const booking = asyncHandler(async (req, res) => {
    const { productId } = req.params

    if(!productId){
        return res.status(400).json(
            new ApiResponse(400, {}, "productId is required")
        )
    }

    const product = await Product.findById(productId)

    console.log(product);

    const { rentalFrom, rentalTo, totalAmount } = req.body 
    // const rentalFrom = '2024-06-29T05:12:31.000+00:00';
    // const rentalTo = '2024-08-05T05:12:31.000+00:00';
    // const totalAmount = 3000;

    if(!(rentalFrom && rentalTo && totalAmount)){
        return res.status(400).json(
            new ApiResponse(400,{},"All input fields are required")
        )
    }

    const booking = await Booking.create({
        rentalFrom,
        rentalTo,
        totalAmount,
        seller: product.owner,
        buyer: req.user?._id,
    })

    res
    .status(200)
    .json(
        new ApiResponse(200, booking, "Booking created successfully")
    )
})


export {
    booking
}