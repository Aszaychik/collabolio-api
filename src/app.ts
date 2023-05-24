import dotenv from 'dotenv';

dotenv.config(); // Configure the environment variables

import express, { Application, Request, Response } from 'express';
import routes from './routes/routes';
import cors from 'cors';
// import { authMiddleware } from './middleware/auth.js';
import db from './db/mongoDb';
import path from 'path';

db;

export const app: Application = express(); // Create the Express application

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) middleware to allow requests from different origins
app.use(express.json()); // Parse incoming requests with JSON payloads

// Serve the index.html file as the default page
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// app.use(authMiddleware); // Add the authorization middleware (for checking the JWT token in the request header)
app.use('/api', routes); // mount the routes
