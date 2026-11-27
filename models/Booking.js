import mongoose, { Schema } from "mongoose";
import User from "./User.js";

const bookingSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    ticketCount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
