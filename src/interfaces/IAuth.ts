import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface IRegisterIAuth {
  email: string;
  password: string;
  username: string;
}

export interface ILoginIAuth {
  email: string;
  password: string;
}

export interface IReqAuth extends Request {
  currentUser: {
    _id: ObjectId;
  };
}
