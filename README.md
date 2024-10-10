# Social Media API Documentation

This document provides details about the APIs available for the Social Media Backend, including request parameters and response parameters for each endpoint.

## Table of Contents
- Register User
- Login User
- Send Friend Request
- Accept Friend Request
- Reject Friend Request
- Create Post
- Create Comment
- Get Feed From Friends
- Get Feed From Non-Friends

---

## Register User
### Endpoint
`POST /api/auth/register`
### Request
- **Body Parameters:**
  - `username` (string) - Unique and Required
  - `email` (string) - Unique and Required
  - `password` (string) - Required

### Example Request
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## Login User
### Endpoint
`POST /api/auth/login`

### Request
- **Body Parameters:**
  - `email` (string) - Required
  - `password` (string) - Required
 
### Example Request
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Send Friend Request
### Endpoint
`POST /api/friends/send`

### Request
- **Headers:**
  - `authorization (jwt token)` - Required
- **Body Parameters:**
  - `friendId` (uniqueId) - Required
 
### Example Request
```json

{
  "friendId": "6707a9138ddba9b573fe5aed"
}
```

## Accept Friend Request
### Endpoint
`POST /api/friends/accept`

### Request
- **Headers:**
  - `authorization (jwt token)` - Required
- **Body Parameters:**
  - `friendId` (uniqueId) - Required
 
### Example Request
```json
{
  "friendId": "6707a9138ddba9b573fe5aed"
}
```

## Reject Friend Request
### Endpoint
`POST /api/friends/reject`

### Request
- **Headers:**
  - `authorization (jwt token)` - Required
- **Body Parameters:**
  - `friendId` (uniqueId) - Required
 
### Example Request
```json
{
  "friendId": "6707a9138ddba9b573fe5aed"
}
```

## Create Post 
### Endpoint
`POST /api/posts/create`

### Request
- **Headers:**
  - `authorization (jwt token)` - Required
- **Body Parameters:**
  - `text` (string) - Required
 
### Example Request
```json
{
  "text": "message"
}
```


## Create Comment on a post 
### Endpoint
`POST /api/posts/comment`

### Request
- **Headers:**
  - `authorization (jwt token)` - Required
- **Body Parameters:**
  - `text` (string) - Required
  - `postId` (uniqueId) - Required
 
### Example Request
```json
{
  "postId":"6707c7231d45f75f76c24233",
  "text": "message"
}
```

##  API that displays posts from non-friends if a friend has commented on it.

### Endpoint
`POST /api/posts/non-friend-posts`

### Request
- **Headers:**
  - `authorization (jwt token)` - Required
 

##  API that displays posts from a user’s friends
### Endpoint
`POST /api/posts/friend-posts`

### Request
- **Headers:**
  - `authorization (jwt token)` - Required


 





