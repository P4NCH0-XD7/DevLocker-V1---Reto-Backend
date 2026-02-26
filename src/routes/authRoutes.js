import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidators.js';

const router = express.Router();

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);

export default router;
