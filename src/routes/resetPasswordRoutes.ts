import { Router } from 'express';
import { linkResetPassword } from '../controllers/resetPasswordController';

const router = Router();
router.post('/', linkResetPassword);

export default router;
