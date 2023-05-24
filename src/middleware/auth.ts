import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Users from '../models/Users';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token: string = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    const { id } = decodedToken as JwtPayload;

    const user = Users.findById(id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.body.currentUser = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }
};
