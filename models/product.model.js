import mongoose from "mongoose"

const productSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String 
        },
        category: { 
            type: String, 
            required: true 
        },
        rentalPrice: { 
            type: Number, 
            required: true 
        },
        availabilityStatus: { 
            type: Boolean, 
            default: true 
        },
        images: [{ 
            type: String 
        }],
        location: { 
            type: String, 
            required: true 
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, 
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);