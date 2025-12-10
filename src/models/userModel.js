import mongoose from "mongoose"

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    forgotPasswordToken: {
        type: String
    },

    forgotPasswordTokenExpiry: {
        type: Date
    },

    verifyToken: {
        type: String
    },

    verifyTokenExpiry: {
        type: Date
    }

})

export const User = mongoose.model("User", userSchema)