import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import resetPasswordRoutes from './resetPasswordRoutes';

// Create router
const router = Router();

// Routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/reset-password', resetPasswordRoutes);
export default router;
