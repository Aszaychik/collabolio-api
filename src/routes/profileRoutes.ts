import { Router } from 'express';
import { updateProfilePhoto } from '../controllers/profileControllers';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.post('/upload-photo', updateProfilePhoto);

export default router;
