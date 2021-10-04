import express from 'express';
import AuthController from '../controllers/AuthController'
import Auth from "../middlewares/Auth";

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.signIn);
router.get('/me', Auth, AuthController.me);
router.get('/profile', Auth, AuthController.profile);
router.post('/logout', Auth, AuthController.logout);

export default router;
