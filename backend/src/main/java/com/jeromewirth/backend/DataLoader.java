package com.jeromewirth.backend;

import com.jeromewirth.backend.model.*;
import com.jeromewirth.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TimeEntryRepository timeEntryRepository;

    @Autowired
    private VacationDayRepository vacationDayRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Users
            User employee = new User("employee@example.com", passwordEncoder.encode("password"), Role.EMPLOYEE);
            employee.setVacationBalance(30);
            userRepository.save(employee);

            User hr = new User("hr@example.com", passwordEncoder.encode("password"), Role.HR);
            hr.setVacationBalance(30);
            userRepository.save(hr);

            User admin = new User("admin@example.com", passwordEncoder.encode("password"), Role.ADMIN);
            admin.setVacationBalance(30);
            userRepository.save(admin);

            // Clients
            Client clientA = new Client("Client A");
            clientRepository.save(clientA);

            Client clientB = new Client("Client B");
            clientRepository.save(clientB);

            // Projects
            Project project1 = new Project("Project 1", clientA);
            projectRepository.save(project1);

            Project project2 = new Project("Project 2", clientB);
            projectRepository.save(project2);

            // Assign projects to employee
            employee.getProjects().add(project1);
            employee.getProjects().add(project2);
            userRepository.save(employee);

            // Time Entries
            TimeEntry entry1 = new TimeEntry(employee, project1, clientA,
                    java.time.LocalDateTime.of(2025, 9, 1, 9, 0),
                    java.time.LocalDateTime.of(2025, 9, 1, 12, 0), 180L, "Worked on Project 1");
            timeEntryRepository.save(entry1);

            TimeEntry entry2 = new TimeEntry(employee, project2, clientB,
                    java.time.LocalDateTime.of(2025, 9, 2, 10, 0),
                    java.time.LocalDateTime.of(2025, 9, 2, 14, 0), 240L, "Worked on Project 2");
            timeEntryRepository.save(entry2);

            TimeEntry entry3 = new TimeEntry(employee, project1, clientA,
                    java.time.LocalDateTime.of(2025, 8, 15, 9, 0),
                    java.time.LocalDateTime.of(2025, 8, 15, 17, 0), 480L, "Old entry");
            timeEntryRepository.save(entry3);

            // Vacation
            VacationDay vacation = new VacationDay(employee,
                    java.time.LocalDate.of(2025, 9, 10),
                    java.time.LocalDate.of(2025, 9, 15), VacationType.VACATION, VacationStatus.APPROVED);
            vacationDayRepository.save(vacation);
        }
    }
}
