import { Request, Response } from 'express';
import Users from '../models/Users';

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Users.findById(id);
  res
    .json({ message: 'User found successfully', user, statusCode: 200 })
    .status(200);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await Users.find();
  res
    .json({ message: 'Users found successfully', users, statusCode: 200 })
    .status(200);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Users.findByIdAndDelete(id);
  res
    .json({ message: 'User deleted successfully', user, statusCode: 200 })
    .status(200);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const user = await Users.findByIdAndUpdate(
    id,
    { username, email, password },
    { new: true },
  );
  res
    .json({ message: 'User updated successfully', user, statusCode: 200 })
    .status(200);
};
