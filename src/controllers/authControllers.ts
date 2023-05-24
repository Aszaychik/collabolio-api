import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import { loginIAuth, registerIAuth } from '../interfaces/IAuth';

export const register = async (req: Request, res: Response) => {
  try {
    const reqBody: registerIAuth = req.body;

    // Check if the username, email and password are provided
    if (!reqBody.username || !reqBody.email || !reqBody.password) {
      return res
        .status(400)
        .json({ message: 'Username, email and password are required' });
    }

    //Check if the username not contain space
    if (reqBody.username.includes(' ')) {
      return res.status(400).json({ message: 'Username cannot contain space' });
    }

    // Check if the username already exists
    if (await Users.findOne({ username: reqBody.username })) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if the user email already exists
    const user = await Users.findOne({ email: reqBody.email });
    if (user) {
      return res.status(400).json({ message: 'User email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(reqBody.password, 10);

    // Save the new user to the database
    const newUser = new Users({
      username: reqBody.username,
      email: reqBody.email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || '',
    );

    // Return the token
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const reqBody: loginIAuth = req.body;

    // Check if the email and password are provided
    if (!reqBody.email || !reqBody.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    // Checkif the user exists
    const user = await Users.findOne({ email: reqBody.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      reqBody.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const jwtSecret = () => {
      const secret = crypto.randomBytes(32);
      return secret.toString('base64');
    };
    const token = jwt.sign({ userId: user._id }, jwtSecret());

    // Return the token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
