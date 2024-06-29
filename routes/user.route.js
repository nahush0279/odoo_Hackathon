import { Router } from "express";
import { createUser, loginUser, getDetail } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/createUser").get(createUser)
router.route("/login").post(loginUser)
router.route("/getDetails").get(verifyJWT, getDetail)

export default router