# NgTimeTrack

A modern web-based time tracking application for teams, built with Angular 20 (frontend) and Spring Boot (backend). This monorepo contains both frontend and backend code, as well as AI project documentation and planning in the `.ai` folder.

---

## Project Structure

```
ngtimetrack/
│
├── frontend/         # Angular 20 app (UI)
├── backend/          # Spring Boot app (API & DB)
├── .ai/              # AI-generated docs, plans, and requirements
├── README.md         # Project overview and instructions
└── ...               # Other root files (e.g., .gitignore, package.json)
```

---

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Java 17+ (for backend)
- PostgreSQL (or compatible DB)

### 1. Clone the Repository

```sh
git clone https://github.com/your-org/ngtimetrack.git
cd ngtimetrack
```

### 2. Frontend Setup

```sh
cd frontend
npm install
npm start
```

- Runs Angular app at `http://localhost:4200`

### 3. Backend Setup

```sh
cd ../backend
# Configure DB connection in application.properties
./gradlew bootRun  # or ./mvnw spring-boot:run
```

- Runs Spring Boot API at `http://localhost:8080`
- Swagger UI available at `/swagger-ui.html`

### 4. AI Documentation

- See `.ai/` for product requirements, tech stack, and implementation plans.

---

## Features (Base Version)

- User authentication (email/password)
- Roles: Employee, HR, Admin
- Time entry (manual & timer-based)
- Project & client management
- Vacation day tracking (30/year per employee)
- Personal dashboard (employee)
- HR dashboard (report status, vacation overview)
- API documentation (Swagger)

---

## Testing

- Frontend: `npm test` (from `frontend/`)
- Backend: `./gradlew test` or `./mvnw test` (from `backend/`)
- Minimum 70% code coverage required

---

## Contributing

1. Fork the repo and create a feature branch
2. Make your changes and add tests
3. Open a pull request with a clear description

---

## License

MIT (or your chosen license)

---

## Credits

- Angular, Spring Boot, PostgreSQL, NgRx, and all open-source contributors

---

## Contact

For questions or support, open an issue or contact the maintainers.
