package com.jeromewirth.backend.controller;

import com.jeromewirth.backend.model.*;
import com.jeromewirth.backend.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class TimeEntryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private TimeEntryRepository timeEntryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @WithMockUser(username = "test@example.com", roles = { "EMPLOYEE" })
    public void testGetAllTimeEntries() throws Exception {
        // Create test user
        User user = new User("test@example.com", passwordEncoder.encode("pass"), Role.EMPLOYEE);
        userRepository.save(user);

        // Create test data
        Client client = new Client("Test Client");
        clientRepository.save(client);

        Project project = new Project("Test Project", client);
        projectRepository.save(project);

        TimeEntry entry = new TimeEntry(user, project, client, LocalDateTime.now(), LocalDateTime.now().plusHours(1),
                60L, "Test entry");
        timeEntryRepository.save(entry);

        mockMvc.perform(get("/api/time-entries"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "test@example.com", roles = { "EMPLOYEE" })
    public void testCreateTimeEntry() throws Exception {
        // Create test user
        User user = new User("test@example.com", passwordEncoder.encode("pass"), Role.EMPLOYEE);
        userRepository.save(user);

        // Create test data
        Client client = new Client("Test Client");
        clientRepository.save(client);

        Project project = new Project("Test Project", client);
        projectRepository.save(project);

        String createRequest = """
                {
                    "project": {"id": %d},
                    "client": {"id": %d},
                    "startTime": "2023-09-01T09:00:00",
                    "endTime": "2023-09-01T10:00:00",
                    "duration": 60,
                    "description": "Created entry"
                }
                """.formatted(project.getId(), client.getId());

        mockMvc.perform(post("/api/time-entries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(createRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Created entry"));
    }

    @Test
    @WithMockUser(username = "hr@example.com", roles = { "HR" })
    public void testGetAllTimeEntriesForHR() throws Exception {
        mockMvc.perform(get("/api/time-entries/all"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "employee@example.com", roles = { "EMPLOYEE" })
    public void testGetAllTimeEntriesForHRUnauthorized() throws Exception {
        mockMvc.perform(get("/api/time-entries/all"))
                .andExpect(status().isForbidden());
    }
}
