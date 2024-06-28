import dotenv from "dotenv";
import connectDB from './config/db.js';
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

// Connect to the database
connectDB()
.then(() => {
    try {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error : ", error);
    }
})

// app.get("/register", (req, res) => {
//     res.send("Hello World!")
// })
