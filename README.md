# Company & User Management API

## Tech Stack

- Node.js 18+
- Express.js
- MongoDB
- Mongoose
- ES6 Modules

## Features

- Company hierarchy management
- User management with company association
- Search API with MongoDB Aggregation
- Optimized indexes for fast queries

## Setup Instructions

1. Clone repository

```bash
git clone https://github.com/FormShantonu/company_management_system.git
cd company-user-api
```

### Install dependencies

`npm install`

### Create .env file

`cp .env.example .env`

### Run the server

`npm run dev`

## API Documentation

- Create Company

POST /companies
Request Body

```
{
  "name": "Parent Company",
  "parentCompanyId": "optional-id"
}
```

Response:

```
{
  "_id": "603d094e8a8a3b001f5705e4",
  "name": "TechCorp",
  "parentCompanyId": null,
  "createdAt": "2025-02-23T12:00:00Z",
  "updatedAt": "2025-02-23T12:00:00Z"
}

```

- Get Company Details
  Endpoint: GET /companies/:companyId
  Example: GET /companies/603d094e8a8a3b001f5705e4

Response:

```

{
  "_id": "603d094e8a8a3b001f5705e4",
  "name": "TechCorp",
  "parentCompanyId": null,
  "createdAt": "2025-02-23T12:00:00Z",
  "updatedAt": "2025-02-23T12:00:00Z"
}

```

- Create User

POST /users

Request Body:

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "companyId": "company-id"
}
```

Response:

```
{
  "_id": "603d09878a8a3b001f5705e5",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "companyId": "603d094e8a8a3b001f5705e4",
  "role": "user",
  "createdAt": "2025-02-23T12:05:00Z",
  "updatedAt": "2025-02-23T12:05:00Z"
}
```

- Get User Details

Endpoint: GET /users/:userId
Example: GET /users/603d09878a8a3b001f5705e5
Response:

```
{
  "_id": "603d09878a8a3b001f5705e5",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "companyId": {
    "_id": "603d094e8a8a3b001f5705e4",
    "name": "TechCorp"
  },
  "role": "user",
  "createdAt": "2025-02-23T12:05:00Z",
  "updatedAt": "2025-02-23T12:05:00Z"
}

```

- Search Endpoint

Endpoint: GET /search?query=<keyword>
Example: GET /search?query=John

Response:

```
{
  "users": [
    {
      "_id": "603d09878a8a3b001f5705e5",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "companyId": {
        "_id": "603d094e8a8a3b001f5705e4",
        "name": "TechCorp"
      }
    }
  ],
  "companies": [
    {
      "_id": "603d094e8a8a3b001f5705e4",
      "name": "TechCorp",
      "parentCompanyId": null
    }
  ]
}
```