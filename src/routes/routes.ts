import { Router } from 'express';
import { helloWorld } from '../controllers/helloControllers';
import authRoutes from './authRoutes';
// Create router
const router = Router();

// Routes
router.get('/', helloWorld);
router.use('/auth', authRoutes);

export default router;
