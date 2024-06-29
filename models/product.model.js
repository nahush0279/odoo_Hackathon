import mongoose, {Schema} from "mongoose"

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
            type: Number
        },
        availabilityStatus: { 
            type: Boolean, 
            default: true 
        },
        image1: { 
            type: String 
        },
        image2: { 
            type: String 
        },
        image3: { 
            type: String 
        },
        image4: { 
            type: String 
        },
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

export const Product = mongoose.model("Product", productSchema);