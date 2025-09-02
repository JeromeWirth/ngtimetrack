package com.jeromewirth.backend.repository;

import com.jeromewirth.backend.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TimeEntryRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TimeEntryRepository timeEntryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    public void testFindByUser() {
        // Create test data
        User user = new User("test@example.com", "pass", Role.EMPLOYEE);
        entityManager.persist(user);

        Client client = new Client("Test Client");
        entityManager.persist(client);

        Project project = new Project("Test Project", client);
        entityManager.persist(project);

        TimeEntry entry1 = new TimeEntry(user, project, client, LocalDateTime.now(), LocalDateTime.now().plusHours(1),
                60L, "Test entry 1");
        TimeEntry entry2 = new TimeEntry(user, project, client, LocalDateTime.now(), LocalDateTime.now().plusHours(2),
                120L, "Test entry 2");
        entityManager.persist(entry1);
        entityManager.persist(entry2);

        // Test
        List<TimeEntry> entries = timeEntryRepository.findByUser(user);

        assertThat(entries).hasSize(2);
        assertThat(entries).extracting("description").contains("Test entry 1", "Test entry 2");
    }

    @Test
    public void testSaveTimeEntry() {
        // Create test data
        User user = new User("save@example.com", "pass", Role.EMPLOYEE);
        entityManager.persist(user);

        Client client = new Client("Save Client");
        entityManager.persist(client);

        Project project = new Project("Save Project", client);
        entityManager.persist(project);

        TimeEntry entry = new TimeEntry(user, project, client, LocalDateTime.now(), LocalDateTime.now().plusHours(1),
                60L, "Save test");

        // Test
        TimeEntry saved = timeEntryRepository.save(entry);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getDescription()).isEqualTo("Save test");
    }
}
