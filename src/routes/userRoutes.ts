import { Router } from 'express';
import { getUser, updateUser, getUsers } from '../controllers/userControllers';

import { authMiddleware, isAdmin } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.get('/', getUser);
router.put('/', updateUser);
router.get('/all', isAdmin, getUsers);

export default router;
