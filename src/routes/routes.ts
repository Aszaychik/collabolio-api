import { Router } from 'express';
import authRouter from './userRoutes';
import { helloWorld } from '../controllers';

// Create router
const router = Router();

// Routes
router.get('/', helloWorld);
router.use('/api/auth', authRouter);

export default router;
