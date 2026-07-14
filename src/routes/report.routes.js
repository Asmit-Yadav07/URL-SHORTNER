import {Router} from 'express'
import {verifyJwt} from '../middlewares/auth.middlewares.js'
import {generateReport} from '../controllers/report.controllers.js'


const router=Router()

router.route("/generate-report").post(verifyJwt,generateReport)

export default router