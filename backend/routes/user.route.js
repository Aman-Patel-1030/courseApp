import express from "express";
import { signup,login,logout,purchased } from "../controllers/user.controller.js";//ALERT:: .js hmesa add krna hai
import userMiddleware from "../middlewares/user.mid.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/purchased",userMiddleware,purchased);



export default router;