import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import Users from '../models/Users';
import { IReqAuth } from '../interfaces/IAuth';

export const authMiddleware = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Bearer token missing or invalid' });
  }
  const token: string = authHeader.split(' ')[1];

  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err: VerifyErrors, payload: JwtPayload) => {
        if (err) {
          return res.status(401).json({ err });
        }
        const { userId } = payload;
        const user = await Users.findById(userId);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        req.currentUser = user;
        next();
      },
    );
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }
};
