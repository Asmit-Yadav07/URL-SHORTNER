import { Report } from "../models/report.model.js"
import { Click } from "../models/click.model.js"
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Mongoose } from "mongoose"
import { isValidObjectId } from "mongoose"

const generateReport = asyncHandler(async (req, res) => {
    const { urlId } = req.params

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid User ID")
    }
    const authenticateUserId = req.user?._id
    if (!authenticateUserId) {
        throw new ApiError(401, "Unauthorized access");
    }
    const authenticUrlDoc = await Url.findById(urlId)
    if (!authenticUrlDoc) {
        throw new ApiError(404, "URL not found");
    }
    if ((authenticateUserId.toString()) != authenticUrlDoc.createdBy.toString()) {
        throw new ApiError(400, "You Are Not Allowed To Generate The Report")
    }
    const clickData = await Click.findOne({ urlId });
    const aggregateClicks = clickData ? clickData.totalClicks : 0;

    const report = await Report.findOneAndUpdate(
        { urlId: urlId },
        {
            userId: authenticateUserId,
            urlId: urlId,
            data: [{
                totalClick: aggregateClicks,
                byCountry: req.header("Country") || "Unknown",
                byDevice: req.headers["user-agent"] || "Unknown"
            }]
        },
        {
            new: true,
            upsert: true
        }
    );
    return res
        .status(200)
        .json(new ApiResponse(200, { Report: report }, "Report Created Successfully"))



})
export { generateReport }