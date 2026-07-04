import mongoose from "mongoose"

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
        required: true
    },
    data: [
        {
            totalClicks: {
                type: Number,
                default: 0,
                required: true
            },
            byCountry: {
                type: String,
                required: true
            },
            byDevice: {
                type: String,
                required: true
            }
        }
    ],
    generatedAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
}, { timestamps: true })

export const Report = mongoose.model("Report", reportSchema)
