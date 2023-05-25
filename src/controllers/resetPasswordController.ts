import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Users from '../models/Users';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const sendEmail = async (user: any, token: string) => {
  const { email, username } = user;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, //email id
      pass: process.env.SMTP_PASS, //pass id
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Reset Password',
    text: `Hello ${username}, You have requested for password reset`,
    html: `
    <h1>Hello ${username}</h1>
    <p>You have requested for password reset</p>
    <a href="${process.env.API_URL}/reset-password/${token}">Click here to reset password</a>              
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

//create reset password function using JWT
export const linkResetPassword = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await Users.findOne({ email: email });
  if (!user) {
    res.status(404).json({
      message: 'User not found',
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.status(200).json({
    message: 'Email sent',
    token: token,
    userId: user._id,
    email: user.email,
    username: user.username,
  });
  sendEmail(user, token);
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds parameter
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err: VerifyErrors, payload: JwtPayload) => {
      if (err) {
        return res.status(401).json({ err });
      }
      const { userId } = payload;
      const user = await Users.findByIdAndUpdate(
        userId,
        { password: hashedPassword, updatedAt: new Date() },
        { new: true },
      );
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      return res.status(200).json({
        message: 'Password reset successfully',
      });
    },
  );
};
