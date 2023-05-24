import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

// Create router
const router = Router();

// Routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
export default router;
