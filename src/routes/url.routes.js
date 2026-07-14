
import {Router} from 'express'
import {verifyJwt} from '../middlewares/auth.middlewares.js'
import { createUrl, redirectToUrl } from '../controllers/url.controllers.js'

const router=Router()

router.route("/create").post(verifyJwt,createUrl)
router.route("/redirect").post(redirectToUrl)

export default router
