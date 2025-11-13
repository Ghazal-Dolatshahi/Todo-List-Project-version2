# Todo-List-Project-version2

This project is a continuation of my **To-Do List application series**. It is a **full-stack web application** that allows users to manage their daily tasks efficiently with a minimal interface and a robust backend API.

---

## Features

* **CRUD Operations (Add, Edit, Delete, Mark Done)**
  Users can create new tasks, edit existing ones inline, mark tasks as done or undone, and delete tasks easily. Backend routes handle these operations via RESTful API endpoints.

* **RESTful API with Express.js**

  * `GET /api/todos` → Retrieve all tasks (with optional filtering by `done` query).
  * `POST /api/todos` → Add a new task.
  * `PUT /api/todos/:id` → Update a task (text or done status).
  * `DELETE /api/todos/:id` → Delete a task.

* **In-Memory Data Storage with File Persistence**
  Tasks are stored in a JavaScript array (`todos`) for simplicity. Changes are saved to `data.json` to simulate persistence without using a full database.

* **Filtering by Query Parameter**

  * `?done=true` → Shows only completed tasks.
  * `?done=false` → Shows only pending tasks.

* **Minimal Frontend**
  Built with **HTML, CSS, and vanilla JavaScript** (no frameworks).

  * Interactive task list with Add, Edit, Delete, and Mark Done buttons.
  * Responsive card layout with gradient background and modern styles.

* **Logging Middleware**
  All HTTP requests are logged using `morgan` for easier debugging and monitoring.

* **Custom Error Handling**

  * 404 handler for unknown routes.
  * API 404 for invalid endpoints (`/api/...`).
  * 500 handler for internal server errors.

* **Modular Routes**
  API routes are organized in `routes/todos.js` for better maintainability.

* **Deployable**
  Project can be deployed on platforms like **Render**, **Glitch**, or any Node.js compatible hosting.

---

## Project Structure

```
todo-app/
├── public/
│   ├── index.html       # Frontend HTML
│   ├── style.css        # Frontend CSS
│   └── script.js        # Frontend JS
├── routes/
│   └── todos.js         # API routes
├── data.json            # Simulated persistent storage
├── app.js               # Express server setup
└── package.json         # Node.js dependencies and scripts
```

* `public/` → Frontend files (HTML, CSS, JS)
* `app.js` → Main Express server setup
* `routes/todos.js` → API routes for task management
* `data.json` → Simulated persistence for tasks

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the server**

```bash
npm start
```

4. **Open in your browser**

```
http://localhost:3000
```
---
## Dependencies

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Morgan](https://www.npmjs.com/package/morgan) (Logging middleware)
* [Cors](https://www.npmjs.com/package/cors)
