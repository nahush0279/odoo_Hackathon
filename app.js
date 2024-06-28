import express from "express";
const app = express()
app.use(express.json()) // for parsing application/json

// routes
import userRouter from "./routes/user.route.js"

//routes declaration
app.use("/user", userRouter);


export { app }