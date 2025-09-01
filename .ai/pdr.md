# Time Tracking App Product Requirements Document (PRD)

## 1. Overview

### 1.1 Product Name

NgTimeTrack (Placeholder - can be updated based on final naming).

### 1.2 Product Description

NgTimeTrack is a modern web-based time tracking application designed to replace manual Excel-based tracking of working hours. It allows users to log time spent on tasks, projects, or clients in real-time or manually, generate reports, and export data. The app will be built as a full-stack application using Angular 20 with NgRx for state management on the frontend and Java Spring Boot for the backend.

### 1.3 Version

1.1 (Updated Release)

### 1.4 Date

September 01, 2025

### 1.5 Stakeholders

- Product Owner: [Your Name/Team]
- Development Team: Frontend (Angular/NgRx), Backend (Spring Boot)
- Users: Approximately 40 employees (e.g., developers, managers, support staff), including Employees, Managers, Freelancers (assuming based on typical use case; please provide more details if needed)

## 2. Problem Statement

Currently, working hours are tracked using Excel spreadsheets, which leads to issues such as:

- Manual data entry errors
- Lack of real-time tracking and collaboration
- Difficulty in generating reports or analyzing data
- No automated reminders or integrations
- Security concerns with shared files
- Scalability limitations for growing teams

This app aims to streamline time tracking, improve accuracy, and provide insightful analytics to enhance productivity. Additionally, it will support tracking of vacation days and integrate with Element (a Matrix-based Slack alternative) for notifications and communication.

## 3. Goals and Objectives

### 3.1 Business Goals

- Reduce time spent on manual tracking by 50%.
- Improve data accuracy and reporting efficiency.
- Enable team collaboration for shared projects.
- Provide a scalable solution for approximately 40 users.

### 3.2 User Goals

- Easily start/stop timers or log time manually.
- View personal and team time logs.
- Generate customizable reports (e.g., weekly/monthly summaries).
- Export data in formats like CSV, PDF, Excel (XLSX), or integrate with tools like Google Sheets.
- Track and request vacation days or leaves.
- Receive notifications via Element integration (as a Slack alternative).

### 3.3 Success Metrics

- User adoption rate: 80% within first month.
- Average session time reduced compared to Excel usage.
- Error rate in time entries < 5%.
- Net Promoter Score (NPS) > 7.

## 4. User Personas

### 4.1 Persona 1: Employee/User

- Name: Alex Johnson
- Role: Software Developer
- Age: 28
- Goals: Quickly log daily hours without hassle, track time per task/project, request vacation days.
- Pain Points: Forgets to update Excel, hard to calculate totals, manual leave requests.
- Tech Savvy: High

### 4.2 Persona 2: Manager

- Name: Sarah Lee
- Role: Project Manager
- Age: 35
- Goals: Monitor team hours, generate reports for billing/clients, approve vacation requests.
- Pain Points: Consolidating multiple Excel files, spotting discrepancies, handling leave approvals manually.
- Tech Savvy: Medium

(If you have specific personas or more details, please provide them to refine this section.)

## 5. Features and Requirements

### 5.1 Core Features

- **User Authentication and Authorization**

  - Secure login/signup with email/password or OAuth (e.g., Google).
  - Role-based access (e.g., Admin, Manager, User).
  - Password reset and session management.

- **Time Tracking**

  - Real-time timer: Start, pause, stop for tasks.
  - Manual entry: Log hours with date, start/end time, description.
  - Categorization: Assign time to projects, clients, or tags.

- **Vacation and Leave Tracking**

  - Request submission for vacation days, sick leaves, or other absences.
  - Approval workflow for managers (e.g., approve/deny requests).
  - Calendar view to display team vacations, holidays, and availability.
  - Accrual tracking (e.g., calculate available vacation days based on policy).
  - Integration with time logs to deduct from totals.

- **Dashboard**

  - Overview of daily/weekly/monthly tracked time.
  - Visual charts (e.g., pie charts for time distribution using Angular components).
  - Vacation summary (e.g., remaining days).

- **Projects and Clients Management**

  - Create/edit projects or clients.
  - Assign users to projects for collaboration.

- **Reports and Analytics**

  - Generate reports filtered by date, project, user, or vacation type.
  - Export options: CSV, PDF, Excel (XLSX).
  - Basic analytics: Total hours, overtime calculations, vacation usage.

- **Notifications and Integrations**
  - Reminders for unfinished timers, daily logs, or upcoming vacations.
  - Email summaries (optional).
  - Element integration (Matrix-based Slack alternative): Send notifications for time reminders, approval requests, or report shares via Element channels or direct messages.

### 5.2 Additional Features (Nice-to-Have)

- Further integrations: API for tools like Jira or calendar apps.
- Mobile responsiveness (since Angular supports it).
- Offline support for time logging (using NgRx for state persistence).
- Billable vs. non-billable time tracking.

(If you have priority features or specifics like additional integrations, please let me know.)

## 6. Technical Requirements

### 6.1 Frontend

- Framework: Angular 20
- State Management: NgRx
- UI Library: Angular Material or PrimeNG for components (e.g., timers, charts, calendars).
- Other: RxJS for observables, HTTPClient for API calls.

### 6.2 Backend

- Framework: Java Spring Boot
- Database: PostgreSQL or MySQL (relational for time logs and vacation requests).
- API: RESTful endpoints (e.g., /api/time-entries, /api/reports, /api/vacations).
- Security: Spring Security with JWT for authentication.
- Other: Spring Data JPA for ORM, Lombok for boilerplate reduction. For exports, use libraries like Apache POI for Excel, iText for PDF.

### 6.3 Deployment

- Hosting: In-house servers (on-premise deployment).
- CI/CD: GitHub Actions or Jenkins.
- Environment: Development, Staging, Production.

### 6.4 Data Model (High-Level)

- User: id, email, password_hash, role, vacation_balance
- TimeEntry: id, user_id, project_id, start_time, end_time, duration, description
- VacationRequest: id, user_id, start_date, end_date, type (vacation/sick), status (pending/approved/denied), approver_id
- Project: id, name, client_id, users[]
- Report: Generated on-the-fly or stored summaries

## 7. Non-Functional Requirements

### 7.1 Performance

- Response time: < 2 seconds for API calls.
- Scalability: Handle up to 40 concurrent users.

### 7.2 Security

- Data encryption in transit (HTTPS) and at rest.
- Compliance: GDPR if handling personal data.
- Input validation to prevent SQL injection/XSS.

### 7.3 Usability

- Intuitive UI/UX with modern design.
- Accessibility: WCAG 2.1 compliance (e.g., keyboard navigation).
- Multi-language support (English default; others optional).

### 7.4 Reliability

- Uptime: 99.9%.
- Backup: Daily database backups.
- Error Handling: Graceful degradation, logging with tools like ELK Stack.

## 8. Assumptions and Dependencies

### 8.1 Assumptions

- Users have internet access for real-time features.
- Initial scope is web-only; mobile app separate if needed.
- No custom hardware requirements.
- Element integration assumes access to Matrix API for notifications; details on Element setup (e.g., server URL) will be provided.

### 8.2 Dependencies

- External Libraries: As listed in tech stack, plus Matrix SDK for Element integration if needed.
- Third-Party Services: Email (e.g., SendGrid), Authentication (if OAuth), Matrix/Element API.
- Development Tools: Node.js for Angular, Maven for Spring Boot.

### 8.3 Risks

- Integration challenges between frontend and backend, or with Element.
- Data migration from existing Excel files (import feature may be needed).
- Scope creep if additional features are added.

## 9. Roadmap and Timeline (High-Level)

- **Phase 1: Planning (1-2 weeks)** - Finalize PRD, wireframes.
- **Phase 2: Development (4-8 weeks)** - Build core features, including vacation tracking and Element integration.
- **Phase 3: Testing (2 weeks)** - Unit/integration tests, QA.
- **Phase 4: Deployment (1 week)** - Launch on in-house servers and monitoring.
- **Post-Launch:** Iterations based on feedback.

(Timelines are estimates; please provide more details on deadlines or team size if available.)

## 10. Wireframes

Wireframes are high-level textual representations using ASCII art for simplicity in this Markdown document. These can be used as a starting point for design tools like Figma or Balsamiq. If visual images are needed, we can generate them separately (please confirm if you'd like me to assist with image generation).

### 10.1 Dashboard Wireframe

```
+-------------------------------+
| Header: Logo | User Menu     |
+-------------------------------+
| Timer Controls: Start/Pause/Stop |
| Current Time: [HH:MM]         |
+-------------------------------+
| Charts:                       |
| [Pie Chart: Time Distribution]|
| [Bar Chart: Weekly Hours]     |
+-------------------------------+
| Vacation Summary:             |
| Remaining Days: 15            |
| Upcoming: Sep 10-15           |
+-------------------------------+
| Quick Links: Log Time | Reports|
+-------------------------------+
```

Description: Central dashboard with timer, visual analytics, and vacation overview.

### 10.2 Time Entry Wireframe

```
+-------------------------------+
| Header: Logo | User Menu     |
+-------------------------------+
| Form:                         |
| Project: [Dropdown]           |
| Start Time: [Date/Time Picker]|
| End Time: [Date/Time Picker]  |
| Description: [Text Area]      |
| Buttons: Save | Cancel       |
+-------------------------------+
| Recent Entries:               |
| - Task1: 2h (Sep 1)          |
| - Task2: 3h (Sep 1)          |
+-------------------------------+
```

Description: Simple form for manual time logging, with list of recent entries.

### 10.3 Vacation Request Wireframe

```
+-------------------------------+
| Header: Logo | User Menu     |
+-------------------------------+
| Vacation Request Form:        |
| Type: [Vacation/Sick]         |
| Start Date: [Calendar Picker] |
| End Date: [Calendar Picker]   |
| Reason: [Text Area]           |
| Buttons: Submit | Cancel      |
+-------------------------------+
| Status List:                  |
| - Pending: Sep 10-15          |
| - Approved: Aug 1-5           |
+-------------------------------+
| Calendar View: [Month Grid with Highlights] |
+-------------------------------+
```

Description: Form for submitting requests, with approval status and team calendar.

### 10.4 Reports Wireframe

```
+-------------------------------+
| Header: Logo | User Menu     |
+-------------------------------+
| Filters: Date Range | Project | User |
+-------------------------------+
| Report Table:                 |
| Date | Project | Hours | Notes |
| Sep1 | ProjA   | 8     | ...   |
| Total: 40 hours               |
+-------------------------------+
| Charts: [Line Chart: Hours Over Time] |
+-------------------------------+
| Export Buttons: CSV | PDF | Excel |
+-------------------------------+
```

Description: Filterable report view with table, charts, and export options.

## 11. Appendices

### 11.1 Glossary

- Time Entry: A record of logged hours.
- Project: A grouping for tasks/clients.
- Vacation Request: Submission for leave approval.

### 11.2 References

- Angular Documentation: https://angular.dev/
- NgRx Documentation: https://ngrx.io/
- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Matrix/Element API: https://matrix.org/ (for integration details)
