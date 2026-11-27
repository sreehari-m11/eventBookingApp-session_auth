import express from 'express';
import { register, login, logout, getDashboard } from '../controllers/userController.js'

const router = express.Router();

router.post('/register', register)
router.post('/login', login);
router.get('/dashboard', getDashboard)
router.post('/logout', logout);

export default router;