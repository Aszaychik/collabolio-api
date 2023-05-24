import { Router } from 'express';
import { getUser, updateUser } from '../controllers/userControllers';

import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.get('/', getUser);
router.put('/', updateUser);

export default router;
