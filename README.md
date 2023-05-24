# Collabolio API

Welcome to the Collabolio API! This API allows you to manage users.

## Endpoints

To get started, use the following endpoints:

- \`GET /api/user\`: returns a list of all users
- \`GET /api/user/:id\`: returns a single user by ID
- \`POST /api/user\`: creates a new user
- \`PUT /api/user/:id\`: updates a user by ID
- \`DELETE /api/user/:id\`: deletes a user by ID

All endpoints are accessed via HTTP and return JSON responses. The API is secured using JWT authentication. To use the API, you'll need to obtain an access token by authenticating using your credentials.

## Authentication

To manage authentication, use the following endpoints:

- \`POST /api/auth/login\`: logs in a user and returns an access token
- \`POST /api/auth/register\`: creates a new user account

## Documentation

For more information on how to use the API, please refer to the documentation.

Thank you for using the Collabolio API!
