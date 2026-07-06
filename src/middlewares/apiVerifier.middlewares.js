import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


const verifyApi = asyncHandler(async (req, res, next) => {
    const apikey = req.header("x-api-key");
    if (!apikey) {
        throw new ApiError(401, "API Key is required");
    }
    const user = await User.findOne({ apikey: apikey })
    if (!user) {
        throw new ApiError(401, "Invalid Api Key")
    }
    req.user = user
    next()

})

export { verifyApi }