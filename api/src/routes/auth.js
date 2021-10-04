import express from 'express';
import AuthController from '../controllers/AuthController'
import Auth from "../middlewares/Auth";

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/verification', AuthController.verification)
router.post('/login', AuthController.signIn);
router.get('/me', Auth, AuthController.me);
router.get('/profile', Auth, AuthController.profile);
router.post('/logout', Auth, AuthController.logout);
router.post('/update', Auth, AuthController.updateProfile)
router.post('/change-password', Auth, AuthController.changePassword)

export default router;
