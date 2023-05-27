import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import resetPasswordRoutes from './resetPasswordRoutes';
import profileRoutes from './profileRoutes';

// Create router
const router = Router();

// Routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/reset-password', resetPasswordRoutes);
router.use('/profile', profileRoutes);
export default router;
