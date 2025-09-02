-- Sample data for testing

-- Users
INSERT INTO users (email, password_hash, role, vacation_balance) VALUES
('employee@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'EMPLOYEE', 30),
('hr@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'HR', 30),
('admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 30);

-- Clients
INSERT INTO clients (name) VALUES
('Client A'),
('Client B');

-- Projects
INSERT INTO projects (name, client_id) VALUES
('Project 1', 1),
('Project 2', 2);

-- User-Project assignments
INSERT INTO user_projects (project_id, user_id) VALUES
(1, 1),
(2, 1);

-- Time Entries for Employee (user_id=1)
INSERT INTO time_entries (user_id, project_id, client_id, start_time, end_time, duration, description) VALUES
(1, 1, 1, '2025-09-01 09:00:00', '2025-09-01 12:00:00', 180, 'Worked on Project 1'),
(1, 2, 2, '2025-09-02 10:00:00', '2025-09-02 14:00:00', 240, 'Worked on Project 2'),
(1, 1, 1, '2025-08-15 09:00:00', '2025-08-15 17:00:00', 480, 'Old entry');

-- Vacation Days
INSERT INTO vacation_days (user_id, start_date, end_date, type, status) VALUES
(1, '2025-09-10', '2025-09-15', 'VACATION', 'APPROVED');
