# API Documentation - Forum Application

Base URL: `http://localhost:5001/api`

## 🔐 Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

**Error Response (400):**
```json
{
  "error": "Username already exists"
}
```

---

### 2. Login User
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### 3. Get User Profile
**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2024-12-26T10:00:00.000Z"
}
```

**Error Response (401):**
```json
{
  "error": "Access denied. No token provided."
}
```

---

## 📝 Post Endpoints

### 4. Get All Posts
**Endpoint:** `GET /posts`

**Query Parameters (optional):**
- `limit`: Number of posts to return (default: 50)
- `offset`: Number of posts to skip (default: 0)

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "Welcome to the Forum",
    "content": "This is my first post!",
    "user_id": 1,
    "username": "johndoe",
    "created_at": "2024-12-26T10:00:00.000Z",
    "updated_at": "2024-12-26T10:00:00.000Z"
  }
]
```

---

### 5. Get Single Post
**Endpoint:** `GET /posts/:id`

**Success Response (200):**
```json
{
  "id": 1,
  "title": "Welcome to the Forum",
  "content": "This is my first post!",
  "user_id": 1,
  "username": "johndoe",
  "created_at": "2024-12-26T10:00:00.000Z",
  "updated_at": "2024-12-26T10:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Post not found"
}
```

---

### 6. Create Post (Protected)
**Endpoint:** `POST /posts`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My New Post",
  "content": "This is the content of my post."
}
```

**Success Response (201):**
```json
{
  "message": "Post created successfully",
  "postId": 2
}
```

**Error Response (401):**
```json
{
  "error": "Access denied. No token provided."
}
```

---

### 7. Update Post (Protected)
**Endpoint:** `PUT /posts/:id`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Post Title",
  "content": "Updated content here."
}
```

**Success Response (200):**
```json
{
  "message": "Post updated successfully"
}
```

**Error Response (403):**
```json
{
  "error": "You can only edit your own posts"
}
```

---

### 8. Delete Post (Protected)
**Endpoint:** `DELETE /posts/:id`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "message": "Post deleted successfully"
}
```

**Error Response (403):**
```json
{
  "error": "You can only delete your own posts"
}
```

---

## 👤 User Endpoints

### 9. Get User by ID
**Endpoint:** `GET /users/:id`

**Success Response (200):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2024-12-26T10:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "User not found"
}
```

---

### 10. Update User Profile (Protected)
**Endpoint:** `PUT /users/profile`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully"
}
```

---

## 🔒 Authentication & Authorization

### How to Authenticate
1. Register or login to get a JWT token
2. Include the token in the Authorization header for protected routes:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Protected Routes
The following routes require authentication:
- `GET /auth/profile`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`
- `PUT /users/profile`

### Token Expiration
- JWT tokens expire after 24 hours
- After expiration, user must login again

---

## 📊 Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## 💡 Usage Examples

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"securePass123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securePass123"}'
```

**Create Post:**
```bash
curl -X POST http://localhost:5001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My Post","content":"Post content here"}'
```

### Using JavaScript (Fetch API)

```javascript
// Login
const loginResponse = await fetch('http://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securePass123'
  })
});
const { token } = await loginResponse.json();

// Create Post with token
const postResponse = await fetch('http://localhost:5001/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Post',
    content: 'Post content here'
  })
});
```

---

## 🔍 Testing with Postman
1. Import collection dari file yang tersedia
2. Set environment variable `baseUrl` = `http://localhost:5001/api`
3. Setelah login, set variable `token` dengan JWT yang didapat
4. Test semua endpoints dengan token yang valid
