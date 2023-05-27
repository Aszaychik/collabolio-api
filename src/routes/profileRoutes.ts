import { Router } from 'express';
import { updateProfilePhoto } from '../controllers/profileControllers';

const router = Router();

router.post('/upload-photo', updateProfilePhoto);

export default router;
