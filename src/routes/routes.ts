import { Router } from 'express';
import { helloWorld } from '../controllers/helloControllers';

// Create router
const router = Router();

// Routes
router.get('/', helloWorld);

export default router;
