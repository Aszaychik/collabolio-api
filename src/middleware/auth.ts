import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IToken } from '../interfaces/IToken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || '',
    ) as IToken;
    req.body.token = decodedToken.token;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.body;
  if (!token) {
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || '',
    ) as IToken;
    req.body.token = decodedToken.token;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
