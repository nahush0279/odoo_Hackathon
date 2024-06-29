import express from "express";
const app = express()
app.use(express.json()) // for parsing application/json

import userRouter from "./routes/user.route.js"

app.use("/user", userRouter);


export { app }