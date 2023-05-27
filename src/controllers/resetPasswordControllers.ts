import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';

export const resetPasswordLink = async (req: Request, res: Response) => {
  if (!req.body.email) {
    res.status(400).json({
      message: 'Email is required',
    });
  }
  const { email } = req.body;

  getAuth()
    .generatePasswordResetLink(email)
    .then((link) => {
      return res.status(200).json({
        message: 'Email sent',
        link,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: 'Failed to send email',
        error,
      });
    });
};
