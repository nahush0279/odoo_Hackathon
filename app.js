import express from "express";
const app = express()
import cookieParser  from "cookie-parser";
app.use(express.json()) // for parsing application/json
app.use(cookieParser())

// routes
import userRouter from "./routes/user.route.js"

//routes declaration
app.use("/user", userRouter);


export { app }