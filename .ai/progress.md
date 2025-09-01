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

All Step 1 tests validated. Ready for Step 2.
