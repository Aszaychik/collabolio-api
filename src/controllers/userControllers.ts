import { Request, Response } from 'express';
import Users from '../models/Users';

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Users.findById(id);
  res.json(user);
};
