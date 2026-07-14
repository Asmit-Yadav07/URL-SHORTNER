import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

import userRouter from './routes/user.routes.js'
import urlRouter from './routes/url.routes.js'
import reportRouter from './routes/report.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/url", urlRouter)
app.use("/api/v1/report", reportRouter)
export default app
