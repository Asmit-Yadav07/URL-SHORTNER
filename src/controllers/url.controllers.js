import { asyncHandler } from "../utils/AsyncHandler.js";
import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { customAlphabet } from "nanoid";


const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const generateShortCode = customAlphabet(alphabet, 6)

const createUrl = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        throw new ApiError(401, "User Must Be Registered")
    }
    const { originalUrl, expiresAt } = req.body
    if (!originalUrl) {
        throw new ApiError(400, "Credentials Must Be There")
    }

    const shortCode = generateShortCode()
    const urlCreated = await Url.create({
        createdBy: user?._id,
        originalUrl: originalUrl,
        shortCodelUrl: shortCode,
        expiresAt: expiresAt,
        isActive: true,
    })
    if (!urlCreated) {
        throw new ApiError(400, "Something Went Wrong")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, { url: urlCreated, createdAt: urlCreated.createdAt, updatedAt: urlCreated.updatedAt }, "Url Injected Successfully"))

})

export { createUrl }