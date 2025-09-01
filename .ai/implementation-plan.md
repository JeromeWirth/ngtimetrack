# Implementation Plan: NgTimeTrack (Base Version)

This plan provides step-by-step instructions for AI developers to implement the base version of NgTimeTrack, reflecting clarified requirements. Each step includes a validation test. No code is included—only clear, actionable instructions.

---

## Key Clarifications for Base Version

- **Roles & Permissions:** Three roles: Employee, HR, Admin. Employees manage only their own data. HR manages projects/clients and can view all time/vacation data. Admins manage users and system settings. See details below.
- **Project Assignment:** Users can assign themselves to projects/clients.
- **Time Entry:** Required fields: project, client, start time, end time, description. Both manual and timer-based entry supported.
- **Authentication:** Email/password only (no OAuth in MVP).
- **Dashboard:** Employees see only their own data. HR can see who has not submitted reports for the month.
- **Testing:** Minimum 70% code coverage for both frontend and backend. Prioritize unit tests for critical paths.
- **API Documentation:** Swagger/OpenAPI documentation required.
- **CI/CD:** Only build/test in initial workflow (no deploy).
- **Vacation Days:** Each employee has 30 vacation days/year. Users see only their own vacation balance; HR can see all. Calendar view for vacation days.
- **UI/UX:** Accessibility and multi-language support deferred to later phases.

---

## 1. Project Setup

### 1.1 Initialize Repositories

- Create separate repositories for frontend (Angular) and backend (Spring Boot).
- Test: Confirm both repos are accessible and can be cloned.

### 1.2 Set Up Frontend Project

- Scaffold a new Angular 20 project with strict mode enabled.
- Add Angular Material and NgRx SignalStore.
- Test: Run `ng serve` and verify the default Angular app loads in the browser.

### 1.3 Set Up Backend Project

- Scaffold a new Spring Boot project with dependencies: Web, JPA, PostgreSQL, Security.
- Add Swagger/OpenAPI support for API documentation.
- Test: Run the backend and access the default health endpoint (e.g., `/actuator/health`). Confirm Swagger UI is available.

### 1.4 Configure Version Control & CI

- Add `.gitignore` and basic GitHub Actions workflow for both projects (build/test only).
- Test: Push a commit and verify CI runs and passes.

---

## 2. Database & Backend Foundation

### 2.1 Define Base Data Models

- Create entities for User (with role, vacation balance), TimeEntry, Project, Client, VacationDay.
- Test: Generate and inspect the database schema; tables should match models and include vacation days.

### 2.2 Implement User Registration & Authentication (JWT)

- Add endpoints for user signup, login, and JWT issuance (email/password only).
- Implement roles: Employee, HR, Admin. Assign default role on signup.
- Test: Register a user, log in, and receive a valid JWT. Confirm role is set and enforced.

### 2.3 Implement Basic CRUD for TimeEntry

- Add endpoints to create, read, update, and delete time entries (authenticated).
- Required fields: project, client, start time, end time, description. Support both manual and timer-based entry.
- Test: Use Postman to create and fetch a time entry for a user. Validate required fields and both entry modes.

### 2.4 Implement Basic CRUD for Project/Client

- Add endpoints to create, read, update, and delete projects and clients.
- Allow users to assign themselves to projects/clients.
- Test: Use Postman to create and fetch a project/client. Assign a user and verify assignment.

### 2.5 Implement Vacation Days Management

- Add endpoints to track vacation days (default 30/year per employee).
- Employees can view only their own vacation balance and days taken.
- HR can view all users' vacation balances and a calendar of all vacations.
- Test: Add vacation days for a user, verify correct balance, and calendar visibility per role.

---

## 3. Frontend Foundation

### 3.1 Set Up Routing & Base Layout

- Implement Angular routing for login, dashboard, time entry, project/client, and vacation pages.
- Add a base layout with header and navigation.
- Test: Navigate between routes and verify layout renders correctly.

### 3.2 Implement Authentication Flow

- Create login and registration forms using Angular Reactive Forms.
- Integrate with backend authentication endpoints (email/password only).
- Enforce role-based access in the UI (Employee, HR, Admin).
- Test: Register and log in a user; verify JWT is stored and sent with requests. Confirm UI changes based on role.

### 3.3 Implement Time Entry UI

- Create a form for adding/editing time entries (manual and timer-based).
- Required fields: project, client, start time, end time, description.
- Display a list of time entries for the logged-in user.
- Test: Add a time entry (both manual and timer-based) and verify it appears in the list.

### 3.4 Implement Project/Client Management UI

- Create forms for adding/editing projects and clients.
- Allow users to assign themselves to projects/clients.
- Display a list of projects/clients.
- Test: Add a project/client and verify it appears in the list. Assign a user and verify assignment.

### 3.5 Implement Vacation Days UI

- Show vacation balance for the logged-in user (employee).
- HR can view all users' vacation balances and a calendar of all vacations.
- Test: Employee sees only their own vacation data; HR sees all. Calendar displays correct data.

---

## 4. State Management & API Integration

### 4.1 Set Up NgRx SignalStore for User, TimeEntry, Project, Vacation State

- Configure stores for user authentication, time entries, projects/clients, and vacation days.
- Test: Dispatch actions and verify state updates in the store for all entities.

### 4.2 Connect UI to Backend APIs

- Use Angular HttpClient to connect forms and lists to backend endpoints.
- Test: Perform CRUD operations from the UI and verify changes in the database for all entities.

---

## 5. Basic Dashboard

### 5.1 Implement Dashboard View

- Employees: Show summary of total hours tracked, recent time entries, and vacation balance.
- HR: Show overview of all employees, including who has not submitted reports for the month.
- Test: Log time entries and verify dashboard updates accordingly. HR can see report status for all users.

---

## 6. Testing & Validation

### 6.1 Backend Unit & Integration Tests

- Write tests for authentication, CRUD endpoints, and role-based access.
- Ensure minimum 70% code coverage.
- Test: Run tests and ensure all pass. Check code coverage report.

### 6.2 Frontend Unit & E2E Tests

- Write tests for forms, state, navigation, and role-based UI.
- Ensure minimum 70% code coverage.
- Test: Run tests and ensure all pass. Check code coverage report.

---

## 7. Documentation

### 7.1 Update README Files

- Document setup, run, and test instructions for both frontend and backend.
- Test: Follow instructions from scratch and verify successful setup.

### 7.2 API Documentation

- Ensure Swagger/OpenAPI documentation is available and up to date for all backend endpoints.
- Test: Access Swagger UI and verify all endpoints are documented.

---

## 8. Review & Handover

### 8.1 Peer Review

- Have another developer review the implementation and run all tests.
- Test: Reviewer confirms all features work and tests pass.

---

**End of Implementation Plan (Base Version)**
