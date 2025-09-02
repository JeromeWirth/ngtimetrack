# NgTimeTrack Backend

This is the Spring Boot backend for NgTimeTrack, a modern web-based time tracking application.

## Prerequisites

- Java 17+
- PostgreSQL (or compatible database)
- Gradle (or use included wrapper)

## Setup

1. Configure database connection in `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/ngtimetrack
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

2. Run the application:

   ```bash
   ./gradlew bootRun
   ```

   The API will be available at `http://localhost:8080`.

## API Documentation

Swagger UI is available at `http://localhost:8080/swagger-ui.html` for interactive API documentation.

## Building

To build the project:

```bash
./gradlew build
```

## Testing

Run unit and integration tests:

```bash
./gradlew test
```

Test reports will be generated in `build/reports/tests/`.

## Code Coverage

Generate JaCoCo coverage report:

```bash
./gradlew jacocoTestReport
```

Report available in `build/reports/jacoco/test/html/index.html`.

## Features

- JWT-based authentication
- Role-based access control (Employee, HR, Admin)
- CRUD operations for time entries, projects, clients
- Vacation day management
- RESTful API endpoints

## Tech Stack

- Spring Boot 3
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Swagger/OpenAPI for documentation
- JUnit 5 and JaCoCo for testing</content>
  <parameter name="filePath">/Users/jeromewirth/dev/git/ngtimetrack/backend/README.md
