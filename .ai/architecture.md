# Architecture Overview: Step 2 (Database & Backend Foundation)

## Monorepo Structure

The repository is organized as a monorepo with the following main folders:

- `frontend/`: Contains the Angular 20 application. All UI, client-side logic, and static assets reside here. Entry point: `frontend/src/main.ts`.
- `backend/`: Contains the Spring Boot application. All API endpoints, business logic, and database integration are here. Entry point: `backend/src/main/java/com/jeromewirth/backend/BackendApplication.java`.
- `.ai/`: Contains AI-generated documentation, requirements, tech stack, implementation plans, progress logs, and architectural notes for future developers.
- `.github/workflows/ci.yml`: GitHub Actions workflow for continuous integration. Runs build and tests for both frontend and backend on every push or pull request.
- `.gitignore`: Root ignore file for Node, Java, and system/IDE files.

## Backend Architecture

The backend is structured using Spring Boot with the following packages:

- `com.jeromewirth.backend.model`: Contains JPA entities (User, TimeEntry, Project, Client, VacationDay) and enums (Role, VacationType, VacationStatus).
- `com.jeromewirth.backend.repository`: Contains JPA repositories for data access (UserRepository, TimeEntryRepository, ProjectRepository, ClientRepository, VacationDayRepository).
- `com.jeromewirth.backend.service`: Contains business logic services (UserDetailsServiceImpl).
- `com.jeromewirth.backend.controller`: Contains REST controllers for API endpoints (AuthController, TimeEntryController, ProjectController, ClientController, VacationDayController).
- `com.jeromewirth.backend.config`: Contains configuration classes (SecurityConfig, AuthTokenFilter, JwtUtils).

### Key Backend Components

- **Entities**: Define the data model with JPA annotations for database mapping.
- **Repositories**: Provide data access layer using Spring Data JPA.
- **Controllers**: Handle HTTP requests and responses, implementing CRUD operations.
- **Security**: JWT-based authentication with role-based access control (Employee, HR, Admin).
- **Configuration**: Security settings, JWT utilities, and database connection.

## Key Files and Their Roles

- `frontend/package.json`: Manages frontend dependencies and scripts.
- `frontend/tsconfig.json`: TypeScript configuration for Angular project.
- `backend/build.gradle`: Manages backend dependencies and build tasks (includes JWT, PostgreSQL, Security).
- `backend/src/main/resources/application.properties`: Backend configuration, including database connection, JWT secrets, and actuator settings.
- `.ai/implementation-plan.md`: Step-by-step implementation guide for developers.
- `.ai/progress.md`: Log of completed steps and decisions for project history.
- `.ai/architecture.md`: This file. Explains the structure and purpose of each major file/folder.

## Database Schema

The application uses PostgreSQL with the following main tables:

- `users`: Stores user information, roles, and vacation balance.
- `clients`: Stores client details.
- `projects`: Stores project details with client relationships and user assignments.
- `time_entries`: Stores time tracking entries with user, project, and client references.
- `vacation_days`: Stores vacation requests with approval workflow.
- `user_projects`: Junction table for many-to-many user-project assignments.

## CI/CD

- `.github/workflows/ci.yml` runs two jobs:
  - `frontend`: Installs dependencies, builds, and tests the Angular app.
  - `backend`: Installs dependencies, builds, and tests the Spring Boot app.

---

This structure supports clear separation of concerns, easy onboarding, and scalable development for both frontend and backend teams.
