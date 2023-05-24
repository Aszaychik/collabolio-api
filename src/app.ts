import dotenv from 'dotenv';

dotenv.config(); // Configure the environment variables

import express, { Application } from 'express';
import routes from './routes/routes';
import cors from 'cors';
// import { authMiddleware } from './middleware/auth.js';
import db from './db/mongoDb';

db;

export const app: Application = express(); // Create the Express application

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) middleware to allow requests from different origins
app.use(express.json()); // Parse incoming requests with JSON payloads

// app.use(authMiddleware); // Add the authorization middleware (for checking the JWT token in the request header)
app.use('/api', routes); // mount the routes
