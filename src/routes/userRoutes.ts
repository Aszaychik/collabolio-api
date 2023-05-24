import { Router } from 'express';
import {
  getUser,
  updateUser,
  //getUsers,
  //createUser,
  //deleteUser,
} from '../controllers/userControllers';

import { authMiddleware } from '../middleware/auth';

const router = Router();

// router.get('/', getUsers);
// router.post('/', createUser);
// router.delete('/:id', deleteUser);
router.use(authMiddleware);
router.get('/', getUser);
router.put('/', updateUser);

export default router;
