# Media Bank Demo

A simple media bank application that allows users to upload, browse, and purchase images and videos.

## Features

- Upload images and videos
- Browse media gallery
- Shopping cart functionality
- Simulated purchase system
- Preview media before upload
- Responsive design

## Tech Stack

- Frontend:
  - React with Vite
  - React Router for navigation
  - TailwindCSS for styling
  - Context API for state management

- Backend:
  - Node.js with Express
  - SQLite database
  - Sequelize ORM
  - Multer for file uploads

## Setup

1. Install dependencies:
```bash
npm run install-all
```

2. Start the development servers:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Development

- Frontend runs on port 5173
- Backend API runs on port 3000
- Files are stored in `backend/uploads/`
- SQLite database is created automatically