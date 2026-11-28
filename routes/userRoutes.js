import express from 'express';
import { register, login, logout, getDashboard, addBooking } from '../controllers/userController.js'

const router = express.Router();

router.post('/register', register)
router.post('/login', login);
router.get('/dashboard', getDashboard)
router.post('/addbooking', addBooking)
router.post('/logout', logout);

export default router;