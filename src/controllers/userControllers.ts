import { Request, Response } from 'express';
import Users from '../models/Users';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

export const getUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body.currentUser;
    if (!Types.ObjectId.isValid(_id)) {
      return res
        .status(404)
        .json({ message: 'User not found', statusCode: 404 });
    }
    const user = await Users.findById(_id);
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

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: 'User created successfully', user, statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const user = await Users.findByIdAndDelete(_id);
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
    const { _id } = req.body.currentUser;
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds parameter
    const user = await Users.findByIdAndUpdate(
      _id,
      { username, email, password: hashedPassword, updatedAt: new Date() },
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
