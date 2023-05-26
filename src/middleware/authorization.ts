import { Response, NextFunction } from 'express';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { IAuthRequest } from '../interfaces/IAuth';

// Create me firebase middleware to check token
export const auth = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const idToken: string = req.headers.authorization;
    if (!idToken) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing authorization token',
      });
    }
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
