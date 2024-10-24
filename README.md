## User Management System API

### Overview

This project is a scalable RESTful API built with Node.js and postgresSQL for managing users with JWT-based user authentication and authorization.

### Features

-  User: registration and login
-  JWT Authentication: Secure endpoints using JWT tokens.
-  User Management: Create, read, update, and delete users .
-  API operation managed by roles and admin will assign roles to users
-  Admin can delete users
-  CORS support
-  All tables created by database migration
-  Cloud Deployment: Server deployed on AWS cloud (EC2 Instance)
-  Scalability: It is scalable application. We can do horizontal scale. Will do load balancing using nginx server.

## Roles

- Admin
    - Get all users data by filtering
    - Update users data
    - Delete users
    - Disable users
    - Assign role to users
    - Get all roles
- Super (Default)
    - Get user data (self)
    - Update user data
- Viewer
    - Get user data only (self)


### Requirements

-  Node.js (v16+)
-  Postgres (v16.x+)
-  Postman for API testing
-  Nginx (Reverse proxy server)

### Deployment on AWS cloud

I deployed the user management application on the AWS cloud(EC2 Instance). Please use the 13.127.161.117 public IP address to test the API's

### Setup

#### Installation

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables by changing in .env file:

```bash
# DB configuration

USER_NAME=<username>
PASSWORD=<password>
DB_NAME=<database_name>
DB_HOST=<database_host>
DB_PORT=<database_port>
DIALECT=<dialect>

# App configuration

ADMIN_PASSWORD=<admin_password> # Here taken admin password for temporary purpose, We should use encrypted password here
PORT=<server_port> # default 3000
SECRET_KEY=<secret_key_for_issue_token>

#### Example

# DB configuration

USER_NAME='admin'
PASSWORD='admin123'
DB_NAME='usermgmt'
DB_HOST='localhost'
DB_PORT=5432
DIALECT='postgres'

# App configuration

ADMIN_PASSWORD='admin' # Here taken admin password for temporary purpose, We should use encrypted password here
PORT=3000
SECRET_KEY='THIS IS SECRETE KEY'

```

4. Database migration setup
    We can do database creation, migration and seeding in single command and also individual

    - Setup in single command
```bash
    npm run setup  # To setup database creation, migration and seeding in single command
```
    -  Setup in individual
```bash
    npm run create  # To create databse

    npm run migrate # To create database tables

    npm run seed  # To seed data (Default entries)
```

5. Start the server:

```bash

node server.js

```

5. Install and setup nginx reverse proxy server

Add the below contain in nginx server configuration file at /etc/nginx/sites-enabled/default

```bash
upstream user-mgmt-upstream {
        server 127.0.0.1:3000;
}

server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name 0.0.0.0;

        location / {
                proxy_pass http://user-mgmt-upstream;
        }
}

```

The server will be running on http://localhost:3000

You can test the below API's by importing postman json file. find the User-Mgmt.postman_collection.json file in repository, Import the same file in postman. You will get all API test.

### API Documentation

You can interact with the API using Postman once the server is running.

#### User Authentication

#### Register a New User

-  URL: /register
-  Method: POST
-  Body:

```bash
{
    "firstName": "pravin", 
    "lastName": "dasari",
    "email": "one@gmail.com",
    "password": "******",
    "phone": "1234567890"
}
```

-  Explanation

   -  All fields are mandatory
   -  Password should be greater than 7 and less than 17 characters

-  Response

```bash
{
    "message": "one@gmail.com user registration success"
}
```

#### User Login

-  URL: /login
-  Method: POST
-  Body:

```bash
{
    "email": "admin@gmail.com",
    "password": "********"
}
```

-  Response

```bash
{
    "message": "User login success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOiIxIiwicGhvbmUiOiI4ODg4MTQ5OTY2IiwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTcyOTgwODU4MywiZXhwIjoxNzI5ODA5MTgzfQ.-Fqw__4aqQGQyEYxhk8-PRcbHesayArdmCphSQnGY-M"
}
```
-   Explaination
    - Token is valid for 10 minute, (I maintained 10 minute session)

### User Management

All user, admin and role operations are JWT protected and require a valid token in the Authorization header.

#### Update user data

-  URL: /user
-  Method: PUT
-  Headers:
   -  Authorization: Bearer <JWT token>
-  Body:

```bash
{
    "firstName": "pravin",
    "lastName": "dasari",
    "phone": "1234567890", 
}
```

-  Explanation

   -  All fields are optional
   -  Only super and admin role user can update user data

-  Response

```bash
{
    "message": "Data updated"
}
```

#### Get user by Id

-  URL: /user/:id
-  Method: GET
-  Headers:
   -  Authorization: Bearer <JWT token>

-  Response:

```bash
{
    "userId": "2",
    "firstName": "pravin",
    "lastName": "dasari",
    "email": "one1@gmail.com",
    "roleId": "2",
    "phone": "1234567890",
    "isActive": true,
    "createdAt": "2024-10-24T21:36:57.747Z",
    "updatedAt": "2024-10-24T21:36:57.747Z"
}
```
-   Explaination
    - All role users can access this API
    - Provide user id in url

#### Delete user 

-  URL: /user/:id
-  Method: DELETE
-  Headers:
   -  Authorization: Bearer <JWT token>
- Exlanation

    - Provide user id in url
-  Response:

```bash
{
    "message": "User deleted"
}
```

#### Get roles (Only for admin role)

- URL: /role
- Method: GET
- Headers:
    - Authorization: Bearer <JWT token>

- Response
```bash
[
    {
        "roleId": "1",
        "roleName": "Admin",
        "description": "We have all permission",
        "createdAt": "2024-10-24T16:59:07.987Z",
        "updatedAt": "2024-10-24T16:59:07.987Z"
    },
    {
        "roleId": "2",
        "roleName": "Super",
        "description": "We have limited permission",
        "createdAt": "2024-10-24T16:59:07.987Z",
        "updatedAt": "2024-10-24T16:59:07.987Z"
    },
    {
        "roleId": "3",
        "roleName": "Viewer",
        "description": "We have read permissions only",
        "createdAt": "2024-10-24T16:59:07.987Z",
        "updatedAt": "2024-10-24T16:59:07.987Z"
    }
]
```

#### Assign role to user (Only admin can assign it)

- URL: /admin/assign-role-to-user
- Method: POST
- Headers:
    - Authorization: Bearer <JWT token>
- Body
```bash
{
    "userId": 3,
    "roleId": 3
}
```
-   Explaination
    - userId -> Provide user id for which user role want to change
    - roleId -> Provide role id which role want to assign

- Response:
```bash
{
    "message": "Role updated to 3 userId"
}
```

#### Get list of user by applying filters like firstName, lastName, roleId, email, phone

- URL: /user
- Method: GET
- Headers:
    - Authorization: Bearer <JWT token>
- Body
```bash
{
    "roleId": 2,
    "firstName": "pravin"
}
```
-   Explaination
    - All fields are optional

-   Response
```bash
[
    {
        "userId": "2",
        "firstName": "pravin",
        "lastName": "dasari",
        "email": "one1@gmail.com",
        "roleId": "2",
        "phone": "1234567890",
        "isActive": true,
        "createdAt": "2024-10-24T21:36:57.747Z",
        "updatedAt": "2024-10-24T21:36:57.747Z"
    }
]
```

### Error Handling

The API includes error handling for:

- Invalid inputs
- Unauthorized access(401)
- Non-existent resources (404 errors)
- Handled CORS





