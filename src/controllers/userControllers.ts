import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || '',
    );

    // Return the token
    res.status(201).json({ token, username, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Checkif the user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '');

    // Return the token
    res.status(200).json({ token, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
