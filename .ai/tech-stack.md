# Recommended Tech Stack for NgTimeTrack

## Frontend

- **Framework:** Angular 20
- **State Management:** NgRx SignalStore
- **UI Library:** Angular Material
- **Charts:** ngx-charts or Angular Material chart components
- **Forms:** Angular Reactive Forms
- **HTTP:** Angular HttpClient
- **Authentication:** Angular OAuth2 OIDC
- **Image Optimization:** NgOptimizedImage

## Backend

- **Framework:** Spring Boot (Java)
- **ORM:** Spring Data JPA (with Hibernate)
- **Database:** PostgreSQL
- **Authentication:** Spring Security with JWT
- **PDF/Excel Export:** iText (PDF), Apache POI (Excel)
- **Notifications:** Matrix Java SDK (for Element integration)
- **API:** RESTful (JSON)

## DevOps & Deployment

- **CI/CD:** GitHub Actions
- **Hosting:** On-premise server
- **Containerization:** Docker (optional)
- **Monitoring/Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)

## Other

- **Testing:** JUnit (backend), Vitest (frontend)
- **Documentation:** OpenAPI/Swagger (backend API), Storybook (optional, for UI components)
- **Email:** Spring Boot Mail or SendGrid API

---

### Why this stack?

- All components are mature, well-documented, and widely used in enterprise environments.
- Angular + NgRx + Material is a proven combination for robust, maintainable UIs.
- Spring Boot + PostgreSQL is a classic, reliable backend stack.
- Matrix SDK and export libraries are best-in-class for your integration needs.
- This stack is scalable, secure, and maintainable, yet not overly complex.
