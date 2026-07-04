import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    totalClicks: {
        type: Number,
        default: 0,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    device: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    browser: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url"
    },
}, { timestamps: true })


export const Click = mongoose.model("Click", clickSchema)