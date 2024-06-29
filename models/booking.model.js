import mongoose from "mongoose"

const bookingSchema = new Schema({
        seller : { 
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true 
        },
        owner : { 
            type: Schema.Types.ObjectId,
            ref: 'Product', 
            required: true 
        },
        itemId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        },
        rentalPrice: { 
            type: Number, 
            required: true 
        },
        rentalFrom: { 
            type: Date, 
            required: true 
        },
        rentalTo: { 
            type: Date, 
            required: true 
        },
        totalAmount: { 
            type: Number, 
            required: true 
        },
        status: { 
            type: String, 
            enum: ['Pending', 'Confirmed', 'Cancelled'], 
            default: 'Pending' 
        }
  }, { timestamps: true });
  
 export const Booking = mongoose.model('Booking', bookingSchema);