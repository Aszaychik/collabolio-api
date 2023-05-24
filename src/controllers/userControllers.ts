import { Request, Response } from 'express';
import Users from '../models/Users';
import { Types } from 'mongoose';

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: 'User not found', statusCode: 404 });
    }
    const user = await Users.findById(id);
    if (user) {
      res
        .status(200)
        .json({ message: 'User found successfully', user, statusCode: 200 });
    } else {
      res.status(404).json({ message: 'User not found', statusCode: 404 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    res
      .status(200)
      .json({ message: 'Users found successfully', users, statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete(id);
    if (user) {
      res
        .status(200)
        .json({ message: 'User deleted successfully', user, statusCode: 200 });
    } else {
      res.status(404).json({ message: 'User not found', statusCode: 404 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await Users.findByIdAndUpdate(
      id,
      { username, email, password, updatedAt: new Date() },
      { new: true },
    );
    if (user) {
      res
        .status(200)
        .json({ message: 'User updated successfully', user, statusCode: 200 });
    } else {
      res.status(404).json({ message: 'User not found', statusCode: 404 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
