import { Router } from "express";
import { createUser, loginUser, updateDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/updateDetails").post(verifyJWT, updateDetails)

export default router