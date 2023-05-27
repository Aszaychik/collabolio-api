import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import { loginIAuth, registerIAuth } from '../interfaces/IAuth';

export const register = async (req: Request, res: Response) => {
  try {
    const reqBody: registerIAuth = req.body;

    // Check if the username, email and password are provided
    if (!reqBody.username || !reqBody.email || !reqBody.password) {
      return res.status(400).json({
        message: 'Username, email and password are required',
        success: false,
      });
    }

    //Check if the username not contain space
    if (reqBody.username.includes(' ')) {
      return res
        .status(400)
        .json({ message: 'Username cannot contain space', success: false });
    }

    // Check if the username already exists
    if (await Users.findOne({ username: reqBody.username })) {
      return res
        .status(400)
        .json({ message: 'Username already exists', success: false });
    }

    // Check if the user email already exists
    const user = await Users.findOne({ email: reqBody.email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User email already exists', success: false });
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

    // Return user data
    return res.status(201).json({
      message: 'User created successfully',
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const reqBody: loginIAuth = req.body;

    // Check if the email and password are provided
    if (!reqBody.email || !reqBody.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required', success: false });
    }

    // Checkif the user exists
    const user = await Users.findOne({ email: reqBody.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email not found', success: false });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      reqBody.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: 'Password is incorrect', success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Return the token
    res.status(200).json({ message: 'Login successful', success: true, token });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
