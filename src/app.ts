import express, { Application } from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
// import { authorization } from './middleware/authorization.js';

dotenv.config(); // Configure the environment variables

export const app: Application = express(); // Create the Express application

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) middleware to allow requests from different origins
app.use(express.json()); // Parse incoming requests with JSON payloads

// app.use(authorization); // Add the authorization middleware (for checking the JWT token in the request header)
app.use('/', routes); // mount the routes
