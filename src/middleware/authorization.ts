import { Request, Response, NextFunction } from 'express';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

// Create me firebase middleware to check token
export const authorization = async (
  req: Request,
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
    req.body.uid = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
