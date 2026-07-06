import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import mongoose, { isValidObjectId } from 'mongoose'
import crypto from "crypto";




const generateAccessAndRefreshToken = asyncHandler(async (userID) => {
    try {
        const user = await User.findById(userID)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")

    }

})

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, name, password } = req.body
    if (!username || !email || !name || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (existedUser) {
        throw new ApiError(400, "User Already Exists")
    }
    const apiKey = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
        username: username,
        email: email,
        name: name,
        password: password,
        apikey: apiKey

    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, { User: createdUser }, "User Registered Successfully"))


})

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username && !email) {
        throw new ApiError(400, "username Or Email Is Required")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(400, "User Is Not Registered")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(400, "Password Is Not Correct")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        }, "User Logged In Successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User Logout Successfully")
        )
})

const updateProfile = asyncHandler(async (req, res) => {
    const { username, name, email } = req.body
    if (!username || !name || !email) {
        throw new ApiError(400, "Fields Required To Update")
    }
    const userID = req.user?._id
    if (!userID) {
        throw new ApiError(400, "Unauthorized Access")

    }

    const updateInfo = await User.findByIdAndUpdate(userID, {
        $set: {
            username: username,
            name: name,
            email: email,
        }
    }, { new: true }).select("-password -refreshToken")
    return res
        .status(200)
        .json(new ApiResponse(200, { User: updateInfo }, "Profile Updated Successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(400, "Unauthorize Access")
    }
    try {
        const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(400, "Invalid RefreshToken")
        }
        if (incomingRefreshToken != user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken, refreshToken: newRefreshToken
                    },
                    "Access token Refreshed"

                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        throw new ApiError(400, "Unauthorized Request")
    }
    const userInfo = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(user._id)
            }
        },
        {
            $project: {
                _id: 1,
                username: 1,
                email: 1,
                name: 1,
                role: 1
            }
        }
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, { userProfile: userInfo[0] }, "Profile Fetched Successfully"))

})




const changeCurrentPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id)
    const { oldPassword, newPassword } = req.body
    if (!user) {
        throw new ApiError(400, "User not authorized || logined")
    }
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Both old password and new password are required")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Password Incorrect")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed Successfully"))


})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset OTP sent successfully")
    )
})

const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.resetPasswordOTP !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (user.resetPasswordOTPExpiry < new Date()) {
        throw new ApiError(400, "OTP Expired");
    }

    user.password = newPassword;

    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;

    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset successful")
    );
})




export {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    refreshAccessToken,
    getUserProfile,
    updateProfile,
    forgotPassword,
    resetPassword,
}