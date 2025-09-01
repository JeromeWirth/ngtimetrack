# Architecture Overview: Step 1 (Project Setup)

## Monorepo Structure

The repository is organized as a monorepo with the following main folders:

- `frontend/`: Contains the Angular 20 application. All UI, client-side logic, and static assets reside here. Entry point: `frontend/src/main.ts`.
- `backend/`: Contains the Spring Boot application. All API endpoints, business logic, and database integration are here. Entry point: `backend/src/main/java/.../BackendApplication.java`.
- `.ai/`: Contains AI-generated documentation, requirements, tech stack, implementation plans, progress logs, and architectural notes for future developers.
- `.github/workflows/ci.yml`: GitHub Actions workflow for continuous integration. Runs build and tests for both frontend and backend on every push or pull request.
- `.gitignore`: Root ignore file for Node, Java, and system/IDE files.

## Key Files and Their Roles

- `frontend/package.json`: Manages frontend dependencies and scripts.
- `frontend/tsconfig.json`: TypeScript configuration for Angular project.
- `backend/build.gradle` or `backend/pom.xml`: Manages backend dependencies and build tasks.
- `backend/src/main/resources/application.properties`: Backend configuration, including database connection and actuator settings.
- `.ai/implementation-plan.md`: Step-by-step implementation guide for developers.
- `.ai/progress.md`: Log of completed steps and decisions for project history.
- `.ai/architecture.md`: This file. Explains the structure and purpose of each major file/folder.

## CI/CD

- `.github/workflows/ci.yml` runs two jobs:
  - `frontend`: Installs dependencies, builds, and tests the Angular app.
  - `backend`: Installs dependencies, builds, and tests the Spring Boot app.

---

This structure supports clear separation of concerns, easy onboarding, and scalable development for both frontend and backend teams.
