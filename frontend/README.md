# NgTimeTrack Frontend

This is the Angular 20 frontend for NgTimeTrack, a modern web-based time tracking application.

## Prerequisites

- Node.js 18+ and npm
- Backend server running (see backend README)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:4200`.

## Building

To build the project for production:

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

## Testing

Run unit tests with Vitest:

```bash
npm test
```

For end-to-end tests (if configured):

```bash
ng e2e
```

## Code Scaffolding

Generate new components, services, etc.:

```bash
ng generate component component-name
```

For a complete list of schematics:

```bash
ng generate --help
```

## Features

- User authentication (login/register)
- Time entry management (manual and timer-based)
- Project and client management
- Vacation tracking
- Role-based dashboards (Employee, HR, Admin)
- Responsive UI with Angular Material

## Tech Stack

- Angular 20
- NgRx SignalStore for state management
- Angular Material for UI components
- RxJS for reactive programming
- Vitest for testing
