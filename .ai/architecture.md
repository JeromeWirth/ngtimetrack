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

---

## Frontend Architecture (Step 3)

The frontend is developed using Angular 20 with a focus on standalone components for better modularity and tree-shaking.

### Component Structure

- **LayoutComponent**: Serves as the main layout wrapper with a Material toolbar for navigation and a router-outlet for rendering child components.
- **Authentication Components**:
  - LoginComponent: Handles user login with reactive forms and API integration.
  - RegisterComponent: Manages user registration with validation.
- **Feature Components**:
  - DashboardComponent: Overview page for users.
  - TimeEntryComponent: Form for logging time entries and displaying recent entries.
  - ProjectsComponent: Interface for managing projects.
  - ClientsComponent: Interface for managing clients.
  - VacationsComponent: Placeholder for vacation tracking.

### Routing Architecture

- Utilizes Angular Router with a hierarchical structure: login/register as top-level routes, and protected routes (dashboard, time-entry, etc.) nested under LayoutComponent.
- Supports future lazy loading for feature modules to improve performance.
- Guards can be added for role-based access control.

### State Management

- Integrated NgRx SignalStore for reactive state management, ready for complex state handling in upcoming steps.
- Local component state managed with signals for simplicity.

### UI/UX Design

- Angular Material provides a consistent, accessible design system.
- Custom dark theme applied globally for a modern, clean appearance with high contrast and readability.
- Responsive design considerations for future mobile support.

### Services and API Integration

- **AuthService**: Handles authentication API calls, JWT management, and user session.
- HttpClient configured for backend communication, with potential for interceptors in future steps.

### Key Files

- `frontend/src/app/app.routes.ts`: Defines the routing configuration.
- `frontend/src/app/app.config.ts`: Application configuration including providers for HTTP and routing.
- `frontend/src/styles.scss`: Global styles with Material theme and dark mode customizations.
- Component files: Individual TypeScript files for each component, following Angular best practices.

This frontend architecture ensures maintainable, performant code with clear separation of concerns, aligning with Angular's standalone component paradigm and preparing for scalable growth.

---

## State Management & API Integration (Step 4)

### NgRx SignalStore Architecture

The application implements a robust state management system using NgRx SignalStore, providing reactive, type-safe state handling across the frontend.

#### Store Structure

- **AuthStore** (`stores/auth.store.ts`): Manages authentication state including user data, JWT token, loading states, and error handling.
- **TimeEntryStore** (`stores/time-entry.store.ts`): Handles time entry CRUD operations with reactive list updates.
- **ProjectStore** (`stores/project.store.ts`): Manages projects and clients with shared state for efficient data access.
- **VacationStore** (`stores/vacation.store.ts`): Controls vacation request management with role-based access.

#### Key Features

- **Reactive State**: All stores use signals for reactive updates, ensuring UI components automatically reflect state changes.
- **Type Safety**: Full TypeScript integration with proper interfaces for all state objects.
- **Error Handling**: Centralized error management with user-friendly error messages.
- **Loading States**: Consistent loading indicators across all operations.
- **Computed Signals**: Derived state calculations for efficient data transformations.

### API Integration Layer

#### Service Architecture

- **AuthService**: Handles authentication endpoints with JWT token management.
- **TimeEntryService**: Provides CRUD operations for time tracking with proper error handling.
- **ProjectService**: Manages project and client data with relationship handling.
- **VacationService**: Supports vacation request operations with role-based permissions.

#### HTTP Interceptor

- **AuthInterceptor** (`auth.interceptor.ts`): Automatically attaches JWT tokens to authenticated requests.
- Configured in `app.config.ts` for global application coverage.
- Handles token injection transparently across all API calls.

#### Data Flow

1. **User Interaction** → Component dispatches action to store
2. **Store** → Calls service method with reactive observables
3. **Service** → Makes HTTP request with interceptor adding auth headers
4. **Backend** → Processes request and returns data
5. **Service** → Returns observable with response/error
6. **Store** → Updates state reactively
7. **Component** → Automatically re-renders with new state

### Security & Authentication

#### JWT Integration

- Tokens stored securely in localStorage
- Automatic token attachment via HTTP interceptor
- Role-based UI rendering based on user permissions
- Secure logout with token cleanup

#### Error Handling

- Network errors gracefully handled with user feedback
- Authentication errors trigger appropriate redirects
- Validation errors displayed inline with forms

### Performance Optimizations

- **Lazy Loading**: Stores loaded on-demand to reduce initial bundle size
- **Reactive Updates**: Only affected components re-render on state changes
- **Efficient Queries**: Backend relationships optimized to prevent N+1 queries
- **Caching**: Local state caching reduces unnecessary API calls

### Testing Strategy

- **Unit Tests**: Individual store methods tested with mock services
- **Integration Tests**: Full API flows tested end-to-end
- **State Validation**: Store state verified after each operation
- **Error Scenarios**: Comprehensive error handling validation

This architecture provides a solid foundation for scalable state management and reliable API integration, ensuring the application remains maintainable and performant as features grow.
