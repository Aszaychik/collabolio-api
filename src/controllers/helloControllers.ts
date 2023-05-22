import { Request, Response } from 'express';

export const helloWorld = (request: Request, response: Response) => {
  return response.json({ message: 'Hello World', code: 200 });
};
