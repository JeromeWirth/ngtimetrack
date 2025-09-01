# Progress Log: Step 1 (Project Setup)

## Date: 2025-09-01

### Step 1.1: Monorepo Structure

- Created `frontend/` for Angular app, `backend/` for Spring Boot app, and `.ai/` for documentation in the project root.
- Verified all folders exist in the root.

### Step 1.2: Frontend Setup

- Scaffolded Angular 20 project in `frontend/` with strict mode enabled.
- Added Angular Material and NgRx SignalStore.
- Ran `npm start` and confirmed the app loads at `http://localhost:4200`.

### Step 1.3: Backend Setup

- Scaffolded Spring Boot project in `backend/` with Web, JPA, PostgreSQL, Security, and Actuator dependencies.
- Installed and configured PostgreSQL locally (via Homebrew on macOS).
- Configured `application.properties` for DB connection.
- Disabled Spring Security temporarily for setup.
- Added Actuator and enabled `/actuator/health` endpoint.
- Ran backend and confirmed health endpoint and Swagger UI are accessible.

### Step 1.4: Version Control & CI

- Added a root `.gitignore` for Node, Java, and system files.
- Created `.github/workflows/ci.yml` for GitHub Actions CI covering both frontend and backend.
- Pushed changes and verified CI runs and passes for both apps.

---

## Step 2: Database & Backend Foundation

## Date: 2025-09-01

### Step 2.1: Define Base Data Models

- Created JPA entities: User, TimeEntry, Project, Client, VacationDay with proper relationships.
- Added enums: Role, VacationType, VacationStatus.
- Verified build successful and schema generation.

### Step 2.2: Implement User Registration & Authentication (JWT)

- Added JWT dependencies.
- Created JwtUtils, AuthTokenFilter, SecurityConfig, UserDetailsServiceImpl.
- Created AuthController with signup and login endpoints.
- Configured Spring Security with JWT authentication.
- Verified build successful.

### Step 2.3: Implement Basic CRUD for TimeEntry

- Created TimeEntryRepository and TimeEntryController.
- Implemented authenticated CRUD operations for time entries.
- Verified build successful.

### Step 2.4: Implement Basic CRUD for Project/Client

- Created ProjectRepository, ClientRepository, ProjectController, ClientController.
- Implemented CRUD for projects and clients, with user assignment.
- Verified build successful.

### Step 2.5: Implement Vacation Days Management

- Created VacationDayRepository and VacationDayController.
- Implemented role-based access for vacation management.
- Verified build successful.

---

All Step 2 tests validated. Ready for Step 3.

---

## Step 3: Frontend Foundation

## Date: 2025-09-01

### Step 3.1: Set Up Routing & Base Layout

- Implemented Angular routing with routes for login, register, dashboard, time-entry, projects, clients, and vacations.
- Created LayoutComponent with Material toolbar for navigation and router-outlet for child routes.
- Verified navigation between routes and layout rendering.

### Step 3.2: Implement Authentication Flow

- Created LoginComponent and RegisterComponent using Angular Reactive Forms.
- Added AuthService for backend API integration (login/register endpoints).
- Implemented JWT token storage in localStorage and redirection after auth.
- Verified user registration, login, and UI role-based access setup.

### Step 3.3: Implement Time Entry UI

- Created TimeEntryComponent with reactive form for manual time entry (project, client, start/end time, description).
- Added list display for recent time entries using \*ngFor.
- Verified form validation, submission, and list updates.

### Step 3.4: Implement Project/Client Management UI

- Created ProjectsComponent and ClientsComponent with basic forms for CRUD operations.
- Verified component rendering and user assignment placeholders.

### Step 3.5: Implement Vacation Days UI

- Created VacationsComponent with placeholders for vacation balance and calendar view.
- Verified component rendering for employee and HR roles.

---

All Step 3 tests validated. Ready for Step 4.
