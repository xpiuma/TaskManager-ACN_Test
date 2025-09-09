# Automated Test Suites

This project includes automated tests for both the backend (Spring Boot) and frontend (React) components. Below is a description of the test cases and how to execute them.

## Backend (Spring Boot)

**Test Files:**
- `backend/src/test/java/com/example/taskmanager/AppTest.java`: Basic application context load test.
- `backend/src/test/java/com/example/taskmanager/TaskControllerIntegrationTest.java`: Integration tests for the Task REST API.

**Test Coverage:**
- Application context loads without errors.
- Creating a new task via the REST API.
- Retrieving all tasks.
- Validation: Ensures a task cannot be created without a title.
- Deleting a task.
- Updating a task.

**How to Run:**
From the project root:
```sh
./test-backend.sh
```
Or from the backend directory:
```sh
cd backend
mvn test
```

---

## Frontend (React)

**Test File:**
- `frontend/src/TaskManager.test.tsx`: Automated UI and logic tests for the Task Manager component.

**Test Coverage:**
- Rendering tasks fetched from the backend API.
- Adding a new task via the UI.
- Validation: Prevents adding a task without a title.
- Deleting a task from the UI.
- Editing/updating a task from the UI.
- Error handling for failed API calls.

**How to Run:**
From the project root:
```sh
./test-frontend.sh
```
Or from the frontend directory:
```sh
cd frontend
npm test
```

---

## Notes
- All tests are automated and can be run with the provided scripts.
- Ensure both backend and frontend dependencies are installed before running tests.
- For more details, see the test files themselves.
