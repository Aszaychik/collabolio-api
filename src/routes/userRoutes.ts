import { Router } from 'express';
import { getUser, getUsers, updateUser } from '../controllers/userControllers';

const router = Router();

router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);

export default router;
