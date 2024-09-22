import { Router } from "express";
import { userSignup,userLogin,userLogout } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signup' ,userSignup)

router.post('/login' , userLogin)

router.post('/logout' ,userLogout)


export default router