//create forgot password function using nodemailer and JWT
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Users from '../models/Users';


export const sendEmail = async (req: Request,  res: Response) => {
  const { email, name, token } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xxx', //email id
      pass: 'xxx', //pass id
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Password',
    html: `
    <h1>Hello ${name}</h1>
    <p>You have requested for password reset</p>
    <a href="${process.env.API_URL}/reset-password/${email}/${token}">Click here to reset password</a>              
    `,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent');
    }
  });
};

//create reset password function using JWT
export const linkResetPassword = async (req: Request, res: Response) => {
    const email = req.params.email;
    const user = await Users.findOne({ email: email });
   if (!user) {
     res.status(404).json({
       message: 'User not found',
     });
   }
   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
   sendEmail(email, token);
   res.status(200).json({

     message: 'Email sent',
     token: token,
     userId: user._id,
     email: email,


