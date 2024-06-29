import express from "express";
const app = express()
import cors from "cors"
import cookieParser  from "cookie-parser";
app.use(express.json()) // for parsing application/json
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// routes
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import bookRouter from './routes/booking.route.js'

//routes declaration
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/product/item", bookRouter)


export { app }