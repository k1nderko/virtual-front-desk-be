# Virtual Front Desk - Backend

Backend API for Virtual Front Desk Programming Practice Project built with Express.js, Sequelize, and MySQL.

## Features

- Session token generation
- Worksheet tasks management
- Task answer submission and validation

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- UUID for token generation

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=virtual_front_desk
DB_USER=root
DB_PASSWORD=your_password
PORT=3001
NODE_ENV=development
```

4. Create the MySQL database:
```sql
CREATE DATABASE virtual_front_desk;
```

5. Run migrations:
```bash
npm run migrate
```

6. Seed the database with example tasks:
```bash
npm run seed
```

7. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### GET /api/session/token
Generates a new session token.

**Response:**
```json
{
  "token": "uuid-token-string"
}
```

### GET /api/tasks
Returns all worksheet tasks with their options.

**Response:**
```json
[
  {
    "id": 1,
    "instruction": "What is the capital of France?",
    "options": [
      {
        "id": 1,
        "text": "London",
        "isCorrect": false
      },
      {
        "id": 2,
        "text": "Paris",
        "isCorrect": true
      }
    ]
  }
]
```

### POST /api/tasks/:taskId/answer
Submits an answer for a task.

**Headers:**
```
Authorization: Bearer <session-token>
```

**Body:**
```json
{
  "optionId": 2
}
```

**Response:**
```json
{
  "isCorrect": true,
  "message": "Correct answer!"
}
```

## Database Schema

- **session_tokens**: Stores session tokens
- **tasks**: Stores worksheet tasks
- **options**: Stores task options (4 per task, 1 marked as correct)
- **answers**: Stores user answers (one per session per task)

## Deployment

### Render Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
   - `NODE_ENV=production`
   - `PORT=3001`
4. Set build command: `npm install`
5. Set start command: `npm run migrate && npm run seed && npm start`

## Testing with Postman

Import the Postman collection from `postman_collection.json` (if provided) or use the endpoints described above.
