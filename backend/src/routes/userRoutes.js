import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
} from '../controllers/userController.js';
import { protect } from '../utils/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// 需要认证的路由
router.use(protect);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
