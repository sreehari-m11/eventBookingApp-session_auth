import mongoose, { Schema } from "mongoose";
import Booking from "./Booking.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ]
})

const User = mongoose.model('User', userSchema);

export default User;