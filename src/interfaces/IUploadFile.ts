import { Request } from 'express';

export interface IReqUplodFile extends Request {
  currentUser: {
    _id: string;
  };
  file: {
    originalname: string;
    encoding: string;
    mimetype: string;
    url: string;
  };
}
