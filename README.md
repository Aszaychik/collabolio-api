# Collabolio API

Welcome to the Collabolio API!

## Endpoints

To get started, use the following endpoints:

#### Get current user

```http
  GET /api/user
```

##### Example output

```http
  {
  "username": "john_doe",
  "googleId": null,
  "email": "john_doe@gmail.com",
  "emailVerified": false,
  "password": "hashed_password",
  "isAdmin": false,
  "createdAt": "2023-05-25T12:30:00.000Z",
  "updatedAt": "2023-05-25T12:30:00.000Z",
  "lastLoginAt": null,
  "profile": {
    "displayName": "John Doe",
    "phoneNumber": "1234567890",
    "age": 30,
    "birthDate": "1993-05-25T00:00:00.000Z",
    "isMale": true,
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "avatarURL": "https://storage.googleapis.com/collabolio-dev.appspot.com/assets/images/avatars/john_doe.png",
    "location": {
      "country": "USA",
      "city": "Los Angeles",
      "lat": 34.0522,
      "lng": -118.2437
    },
    "skills": [
      {
        "name": "JavaScript"
      },
      {
        "name": "Node.js"
      },
      {
        "name": "React"
      }
    ],
    "interests": [
      {
        "name": "Music"
      },
      {
        "name": "Sports"
      }
    ],
    "experience": [
      {
        "title": "Full Stack Developer",
        "company": "ABC Inc.",
        "startDate": "2020-01-01T00:00:00.000Z",
        "endDate": null,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      }
    ],
    "education": [
      {
        "degree": "Bachelor's Degree in Computer Science",
        "school": "XYZ University",
        "startDate": "2015-01-01T00:00:00.000Z",
        "endDate": "2019-12-31T00:00:00.000Z",
        "grade": 3.5
      }
    ],
    "projects": [
      {
        "title": "Collabolio Project",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "link": "https://www.collabolio.com"
      }
    ],
    "certifications": [
      {
        "name": "Google Cloud Certified - Associate Cloud Engineer",
        "credentialURL": "https://www.credential.net",
        "endDate": "2025-05-25T00:00:00.000Z",
        "skills": [
          {
            "name": "Google Cloud Platform"
          },
          {
            "name": "DevOps"
          }
        ]
      }
    ],
    "languages": [
      {
        "name": "English"
      },
      {
        "name": "Spanish"
      }
    ],
    "socialLinks": [
      {
        "name": "LinkedIn",
        "url": "https://www.linkedin.com/in/john_doe"
      },
      {
        "name": "Twitter",
        "url": "https://twitter.com/john_doe"
      }
    ]
  }
}
```

#### Update current user

```http
  PUT /api/user
```

All endpoints are accessed via HTTP and return JSON responses. The API is secured using JWT authentication. To use the API, you'll need to obtain an access token by authenticating using your credentials.

## Authentication

To manage authentication, use the following endpoints:

#### Login in a user and returns an access token

```http
  POST /api/auth/login
```

| Body       | Type     | Description                      |
| :--------- | :------- | :------------------------------- |
| `email`    | `string` | **Required**. Email for login    |
| `password` | `string` | **Required**. Password for login |

#### Register a new user account

```http
  POST /api/auth/register
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `username` | `string` | **Required**. Username for account |
| `email`    | `string` | **Required**. Email for account    |
| `password` | `string` | **Required**. Password for account |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file :

#### Server

`PORT`
`API_URL`
`JWT_SECRET`

#### Database

`DB_NAME`
`MONGO_DB`

#### SMTP

`SMTP_USER`
`SMTP_PASS`

## Documentation

For more information on how to use the API, please refer to the documentation.

Thank you for using the Collabolio API!
