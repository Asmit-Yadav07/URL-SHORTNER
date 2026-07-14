import {Router} from 'express'
import {verifyJwt} from '../middlewares/auth.middlewares.js'

import {   registerUser,loginUser,logoutUser,changeCurrentPassword,refreshAccessToken,getUserProfile,updateProfile,forgotPassword,resetPassword,} from '../controllers/user.controllers.js'


const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/profile")
    .patch(verifyJwt, updateProfile)
    .get(verifyJwt, getUserProfile)

router.route("/change-currentPassword").patch(verifyJwt, changeCurrentPassword)
router.route("/change-forgotPassword").post(forgotPassword)
router.route("/resetPassword").post(resetPassword)



export default router