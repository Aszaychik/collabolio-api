import { Router } from 'express';
import { resetPasswordLink } from '../controllers/resetPasswordControllers';

const router = Router();

router.post('/', resetPasswordLink);

export default router;
