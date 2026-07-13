import { asyncHandler } from "../utils/AsyncHandler.js";
import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { customAlphabet } from "nanoid";
import { Click } from "../models/click.model.js";


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


const redirectToUrl = asyncHandler(async (req, res) => {
    const { shortUrl, urlId } = req.params
    if (!shortUrl) {
        throw new ApiError(400, "Url Must Be There")
    }
    // const url = await Url.findOne({
    //     shortCodelUrl: shortUrl
    // })
    // if (!url || !url.isActive || new Date() > new Date(url.expiresAt)) {
    //     throw new ApiError(400, "Url is Expired || Not Found ,  Generate new one")
    // }


    const updatedUrl = await Url.findOneAndUpdate(
        {
            shortCodelUrl: shortUrl,
            isActive: true,
            expiresAt: { $gt: new Date() },
            clickCount: { $lte: 1000 }
        },
        {
            $inc: { clickCount: 1 }
        },
        {
            new: true
        }
    );
    if (!updatedUrl) {
        const checkUrl = await Url.findOne({ shortCodelUrl: shortUrl });

        if (!checkUrl || !checkUrl.isActive || new Date() > new Date(checkUrl.expiresAt)) {
            throw new ApiError(404, "URL is expired or could not be found");
        }
        if (checkUrl.clickCount > 1000) {
            throw new ApiError(429, "Can't Redirect, Click Limit Reached");
        }

        throw new ApiError(400, "Invalid Request");
    }
    await Click.create({
        urlId: updatedUrl._id,
        totalClicks: updatedUrl.clickCount,
        country: "Unknown",
        city: "Unknown",
        device: "Unknown",
        ip: req.ip,
        browser: "Unknown",
        os: "Unknown",
    })

    return res
        .redirect(updatedUrl.originalUrl)

})


export { createUrl, redirectToUrl }