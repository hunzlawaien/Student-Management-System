# Student Management System

A full-stack web application for managing student records, built with React, Node.js, Express, and MongoDB. The system provides a centralized interface for maintaining student information, tracking registrations, and managing access through role-based permissions.

## Live Demo

- **Live Website:** student-management-system-self-ten-11.vercel.app
- **GitHub Repository:** https://github.com/hunzlawaien/Student-Management-System

## Features

### Authentication and Access Control

- User registration and login
- Administrator and teacher roles
- Role-based access to student management features

### Student Management

- Add new student records
- View student details and the student list
- Edit existing student information
- Delete student records
- Organize students into Classes 1–10
- Assign sections and roll numbers
- Track active and inactive student statuses
- Check for duplicate email addresses and roll numbers

### Dashboard

- View total student records
- Monitor active and inactive students
- View recently registered students

### User Interface

- Responsive React interface
- Dashboard and student management pages
- Search and filtering options
- Pagination for student records
- Separate frontend and backend codebases

## Tech Stack

**Frontend**

- React
- Vite
- Tailwind CSS
- Lucide React

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

**Tools and Deployment**

- Git and GitHub
- Vercel
- MongoDB Atlas

## Project Structure

Student Management System/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ └── ...
│ ├── package.json
│ └── vite.config.js
├── server/
│ ├── config/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── package.json
├── .gitignore
├── vercel.json
└── README.md

_The structure above is representative; folder and file names may differ slightly in your current codebase._

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "Student Management System"
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and configure the required environment variables.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

Replace the example values with your actual configuration. Your variable names must match those used in your backend code.

### 3. Start the Backend

```bash
npm run dev
```

The backend should start on port `5000`, provided that the port is available and the database connection succeeds.

### 4. Set Up the Frontend

Open another terminal from the project root:

```bash
cd client
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

Vite will display the local URL in the terminal, usually `http://localhost:5173`.

The frontend uses the Vite development proxy to forward API requests to the backend.

## Environment Variables

| Variable      | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| `PORT`        | Port used by the Express server                          |
| `MONGODB_URI` | MongoDB connection string                                |
| `JWT_SECRET`  | Secret used for signing or verifying JWTs, if configured |

Keep your `.env` file private. Never commit database credentials, authentication secrets, or other sensitive configuration to GitHub.

## Deployment

The application is deployed using Vercel, with MongoDB Atlas used for database hosting.

For a production deployment:

1. Configure the required environment variables in the deployment settings.
2. Ensure the backend can securely connect to MongoDB Atlas.
3. Verify that API requests are routed to the backend correctly.
4. Test authentication, student operations, and dashboard statistics on the live website.

## Future Improvements

Potential enhancements include:

- Password reset functionality
- Student attendance tracking
- Exporting student records to CSV
- Improved validation and error handling
- Automated tests for API endpoints and frontend components

## Learning Outcomes

This project provided practical experience with:

- Building a React frontend
- Developing REST API endpoints with Express
- Connecting an application to MongoDB
- Implementing authentication and role-based permissions
- Managing application state with React Context
- Handling student record CRUD operations
- Using Git and GitHub for version control
- Deploying a full-stack application

## License

This project is available for educational and portfolio purposes. Add a specific open-source license if you intend to grant others formal permission to reuse or distribute the code.
