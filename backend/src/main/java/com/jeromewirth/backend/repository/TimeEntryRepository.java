package com.jeromewirth.backend.repository;

import com.jeromewirth.backend.model.TimeEntry;
import com.jeromewirth.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimeEntryRepository extends JpaRepository<TimeEntry, Long> {
    List<TimeEntry> findByUser(User user);
}
