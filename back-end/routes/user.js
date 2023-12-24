import express from 'express';
import {
  registerUserController,
  loginUserController,
  resetPasswordController,
  resetPasswordLinkController,
  logOutController
} from '../controllers/AuthController.js'; 
import { checkAuthenticated } from '../middleware/checkAuth.js'

const router = express.Router();

router.post("/register-user", registerUserController);
router.post("/login-user", loginUserController);
router.post("/reset-password", resetPasswordController);  // reset linkini gönderir
router.get("/reset-password", resetPasswordLinkController);  // reset linkine tıkladığında, random pw'yi setler.
router.post("/logout", logOutController);

export default router;
