import { Router } from 'express';
import userRoutes from './userRoutes';
import resetPasswordRoutes from './resetPasswordRoutes';
import { auth } from '../middleware/authorization';
// Create router
const router = Router();

// Routes
router.use('/reset-password', resetPasswordRoutes);
router.use('/user', auth, userRoutes);

export default router;
