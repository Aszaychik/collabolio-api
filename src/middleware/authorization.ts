import { Request, Response, NextFunction } from 'express';

// Create me firebase middleware to check token
export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const idToken = req.headers.authorization;
    if (!idToken) {
      return res.status(401).send('Unauthorized');
    }
    next();
  } catch (error) {
    console.error('Error fetching user data:', error);
    const statusCode: number = error.code || 500;
    const errorMessage: string = error.message || 'Could not fetch user';
    res.status(statusCode).json({ error: errorMessage });
  }
};
