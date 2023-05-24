import { Router } from 'express';
import { getUser } from '../controllers/userControllers';

const router = Router();

router.get('/:id', getUser);

export default router;
