import { Router } from 'express';
import authRoutes from './authRoutes';
// Create router
const router = Router();

// Routes
router.use('/auth', authRoutes);

export default router;
