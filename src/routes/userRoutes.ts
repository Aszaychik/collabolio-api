import { Router } from 'express';
import {
  getUser,
  getAllUsers,
  registerUser,
  updateUser,
  deleteUserAt,
} from '../controllers/userControllers';

const router = Router();

router.get('/test', (req, res) => res.send('User route is working'));
router.get('/all', getAllUsers);
router.get('/:uid', getUser);
router.post('/register', registerUser);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUserAt);

export default router;
