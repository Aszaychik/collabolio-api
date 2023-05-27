import { Router } from 'express';
import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUserAt,
} from '../controllers/userControllers';

const router = Router();

router.get('/all', getAllUsers);
router.get('/:uid', getUser);
router.post('/', createUser);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUserAt);

export default router;
