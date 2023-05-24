import { Router } from 'express';
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/userControllers';

const router = Router();

router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
