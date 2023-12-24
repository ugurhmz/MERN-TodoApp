# Todo App API Documentation

This document provides information on the RESTful API endpoints for a simple Todo application. The API is designed to manage user authentication and todo items.

## .env Contents
- DB_URL= MongoDB URL
- PORT=Backend port
- JWT_SECRET_KEY=
- EMAIL_FROM=For SMTP Mail
- EMAIL_PW=SMTP mail pw
- FRONTEND_URL=http://localhost
- PAS_SECURITY=

## Table of Contents
1. [Authentication](#authentication)
   - [Register User](#register-user)
   - [Login](#login)
   - [Forget Password](#forget-password)
   - [Reset Password](#reset-password)
   - [Logout](#logout)
2. [Todo Operations](#todo-operations)
   - [Get All Todos](#get-all-todos)
   - [Get User's Todos](#get-users-todos)
   - [Create Todo](#create-todo)
   - [Update Todo](#update-todo)
   - [Delete Todo](#delete-todo)

---

## Authentication

### Register User

- **Endpoint**: `POST /ugurv1/api/users/register`
- **Description**: Register a new user.
- **Request**:
  - **Body**:
    - `userMail` (string, required): User's email address.
    - `userName` (string, required): User's username.
    - `password` (string, required): User's password (between 6 and 16 characters).
- **Responses**:
  - `201 Created`: User registration successful.
  - `400 Bad Request`: Invalid input format or password length.
  - `409 Conflict`: Email address already exists.
  - `500 Internal Server Error`: Registration failed.

### Login

- **Endpoint**: `POST /ugurv1/api/users/login`
- **Description**: Authenticate a user.
- **Request**:
  - **Body**:
    - `userMail` (string, required): User's email address.
    - `password` (string, required): User's password.
- **Responses**:
  - `200 OK`: Login successful. Returns user details and a JWT token.
  - `400 Bad Request`: Invalid email format or empty fields.
  - `401 Unauthorized`: User not found or invalid password.
  - `500 Internal Server Error`: Login failed.

### Forget Password

- **Endpoint**: `POST /ugurv1/api/users/forget-password`
- **Description**: Send a password reset link to the user's email.
- **Request**:
  - **Body**:
    - `userMail` (string, required): User's email address.
- **Responses**:
  - `200 OK`: Password reset link sent successfully.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Password reset failed.

### Reset Password

- **Endpoint**: `GET /ugurv1/api/users/reset-password`
- **Description**: Reset user password using a secure token.
- **Request**:
  - **Query Parameters**:
    - `token` (string, required): Reset token.
    - `newpw` (string, required): New password.
- **Responses**:
  - `200 OK`: Password reset successful.
  - `400 Bad Request`: Invalid or expired reset token.
  - `404 Not Found`: User not found or invalid reset token.
  - `500 Internal Server Error`: Password reset failed.

### Logout

- **Endpoint**: `POST /ugurv1/api/users/logout`
- **Description**: Logout the authenticated user.
- **Request**:
  - **Headers**:
    - (Optional) `Authorization` (string): JWT token.
- **Responses**:
  - `200 OK`: Logout successful.
  - `500 Internal Server Error`: Logout failed.

---

## Todo Operations

### Get All Todos

- **Endpoint**: `GET /ugurv1/api/todos`
- **Description**: Get a list of all todos.
- **Responses**:
  - `200 OK`: List of todos retrieved successfully.
  - `500 Internal Server Error`: Todo retrieval failed.

### Get User's Todos

- **Endpoint**: `GET /ugurv1/api/todos/user`
- **Description**: Get todos for the authenticated user.
- **Request**:
  - **Headers**:
    - `Authorization` (string, required): JWT token.
- **Responses**:
  - `200 OK`: List of user's todos retrieved successfully.
  - `204 No Content`: No todos found for the user.
  - `500 Internal Server Error`: Todo retrieval failed.

### Create Todo

- **Endpoint**: `POST /ugurv1/api/todos`
- **Description**: Create a new todo for the authenticated user.
- **Request**:
  - **Headers**:
    - `Authorization` (string, required): JWT token.
  - **Body**:
    - `todoTitle` (string, required): Todo title.
    - `todoDesc` (string): Todo description.
- **Responses**:
  - `201 Created`: Todo creation successful. Returns created todo.
  - `400 Bad Request`: Invalid input.
  - `403 Forbidden`: Unauthorized operation.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Todo creation failed.

### Update Todo

- **Endpoint**: `PUT /ugurv1/api/todos/:todoId`
- **Description**: Update a todo for the authenticated user.
- **Request**:
  - **Headers**:
    - `Authorization` (string, required): JWT token.
  - **Params**:
    - `todoId` (string, required): Todo ID.
  - **Body**:
    - `todoTitle` (string): Updated todo title.
    - `todoDesc` (string): Updated todo description.
- **Responses**:
  - `200 OK`: Todo update successful. Returns updated todo.
  - `400 Bad Request`: Invalid input or todo ID.
  - `403 Forbidden`: Unauthorized operation.
  - `404 Not Found`: Todo not found.
  - `500 Internal Server Error`: Todo update failed.

### Delete Todo

- **Endpoint**: `DELETE /ugurv1/api/todos/:todoId`
- **Description**: Delete a todo for the authenticated user.
- **Request**:
  - **Headers**:
    - `Authorization` (string, required): JWT token.
  - **Params**:
    - `todoId` (string, required): Todo ID.
- **Responses**:
  - `200 OK`: Todo deletion successful.
  - `400 Bad Request`: Invalid todo ID.
  - `403 Forbidden`: Unauthorized operation.
  - `404 Not Found`: Todo not found.
  - `500 Internal Server Error`: Todo deletion failed.

---

## Additional Notes

- If a JWT token is provided in the `Authorization` header, it is recommended but not required for some endpoints.
- Make sure to handle errors gracefully and provide meaningful error messages in the responses.

