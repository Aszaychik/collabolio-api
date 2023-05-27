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
        .json({ message: 'User not found', success: false });
    }
    const user = await Users.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }
    return res
      .status(200)
      .json({ message: 'User found successfully', success: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
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
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }
    return res
      .status(200)
      .json({ message: 'User updated successfully', success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
