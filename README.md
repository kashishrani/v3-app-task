# Task Manager Frontend

This is the frontend part of a Task Manager application built using React. It allows users to manage tasks, including adding, editing, and removing them. Tasks are organized by their due dates, and their statuses are color-coded based on deadlines.

## Features

- Add new tasks with titles, descriptions, and due dates.
- Edit existing tasks.
- Remove tasks.
- View tasks organized by their due dates with color-coded statuses.

## Technologies Used

- React
- Axios for making API requests
- React Icons for icon components
- UUID for generating unique task IDs
- CSS for styling

## Getting Started

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/kashishrani/v3-app-task.git
   ```

2. Navigate to the frontend directory:

   ```
   cd task-app
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Start the React development server:

   ```
   npm start
   ```

5. Open your web browser and access the application at `http://localhost:3000`.

## Usage

- Upon starting the application, you can add new tasks by clicking the "Add Task" button and providing task details.
- Tasks are organized by their due dates and color-coded for better visibility.
- You can edit or remove tasks using the provided buttons.
- Click on a task to expand and view its description and due date.

## Backend

# Task Manager Backend

This is the backend part of a Task Manager application. It provides RESTful API endpoints for managing tasks, including adding, updating, and deleting them. The backend is built using Node.js and Express.js and stores task data in a database.

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your preferred database)
- Axios for making HTTP requests
- UUID for generating unique task IDs

## Getting Started


1. Navigate to the backend directory:

   ```
   cd task-app/server
   ```


2. Set up your database (MongoDB or your preferred database system) and configure the connection details in a `.env` file.

   ```
   MONGODB_URI=your-database-uri
   ```

5. Start the Express.js server:

   ```
   npm start
   ```

6. The server should now be running at `http://localhost:8000`.

## API Endpoints

- `GET /tasks`: Retrieve a list of all tasks.
- `POST /tasks`: Add a new task.
- `PATCH /tasks/:id`: Update an existing task by ID.
- `DELETE /tasks/:id`: Delete a task by ID.
