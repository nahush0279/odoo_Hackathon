import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { booking } from "../controllers/booking.controller.js";

const router = Router()

router.use(verifyJWT)

router.route('/booking/:productId').post(booking)


export default router