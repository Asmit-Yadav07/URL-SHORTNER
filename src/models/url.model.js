import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCodelUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    },
    clickCount: {
        type: Number,
        default: 0,
        required: true
    },
}, { timestamps: true })


export const Url = mongoose.model("Url", urlSchema)