import { Router } from 'express';
import userRoutes from './userRoutes';
import { helloWorld } from '../controllers';
import { auth } from '../middleware/authorization';
// Create router
const router = Router();

// Routes
router.get('/', helloWorld);
router.use('/api/user', auth, userRoutes);

export default router;
