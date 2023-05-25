import { Router } from 'express';
import {
  linkResetPassword,
  resetPassword,
} from '../controllers/resetPasswordController';

const router = Router();
router.post('/', linkResetPassword);
router.post('/:token', resetPassword);

export default router;
