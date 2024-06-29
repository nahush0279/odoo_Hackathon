import mongoose, {Schema} from "mongoose"

const bookingSchema = new Schema({
        seller : { 
            type: Schema.Types.ObjectId, 
            ref: 'Product',
            required: true 
        },
        buyer : { 
            type: Schema.Types.ObjectId,
            ref: 'User', 
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
            type: Boolean,
            default: true 
        }
  }, { timestamps: true });
  
 export const Booking = mongoose.model('Booking', bookingSchema);