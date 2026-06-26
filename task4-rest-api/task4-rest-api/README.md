# Task 4 - Basic REST API
**Mohamed Ismail | SaiKet Systems Internship**

## How to Run

1. Make sure Node.js is installed
2. Open terminal in this folder
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   node index.js
   ```
5. Server runs at: `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get one user by ID |
| POST | /users | Create a new user |
| PUT | /users/:id | Update user (all fields) |
| PATCH | /users/:id | Update user (partial) |
| DELETE | /users/:id | Delete a user |

---

## Testing with Postman

### 1. Get All Users
- Method: GET
- URL: `http://localhost:3000/users`

### 2. Get Single User
- Method: GET
- URL: `http://localhost:3000/users/1`

### 3. Create New User
- Method: POST
- URL: `http://localhost:3000/users`
- Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "age": 25
}
```

### 4. Update User (PUT)
- Method: PUT
- URL: `http://localhost:3000/users/1`
- Body (raw JSON):
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "age": 30
}
```

### 5. Partial Update (PATCH)
- Method: PATCH
- URL: `http://localhost:3000/users/1`
- Body (raw JSON):
```json
{
  "age": 26
}
```

### 6. Delete User
- Method: DELETE
- URL: `http://localhost:3000/users/2`

---

## Skills Used
- Node.js
- Express.js
- REST API Design
- JSON Handling
- HTTP Methods (GET, POST, PUT, PATCH, DELETE)
- Status Codes (200, 201, 400, 404)
