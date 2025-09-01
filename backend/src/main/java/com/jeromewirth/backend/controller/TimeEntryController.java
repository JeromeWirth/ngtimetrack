package com.jeromewirth.backend.controller;

import com.jeromewirth.backend.model.TimeEntry;
import com.jeromewirth.backend.model.User;
import com.jeromewirth.backend.repository.TimeEntryRepository;
import com.jeromewirth.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/time-entries")
@CrossOrigin(origins = "*")
public class TimeEntryController {

    @Autowired
    TimeEntryRepository timeEntryRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<TimeEntry>> getAllTimeEntries(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<TimeEntry> entries = timeEntryRepository.findByUser(userOpt.get());
        return ResponseEntity.ok(entries);
    }

    @PostMapping
    public ResponseEntity<TimeEntry> createTimeEntry(@RequestBody TimeEntry timeEntry, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        timeEntry.setUser(userOpt.get());
        TimeEntry saved = timeEntryRepository.save(timeEntry);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeEntry> updateTimeEntry(@PathVariable Long id, @RequestBody TimeEntry timeEntryDetails,
            Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<TimeEntry> entryOpt = timeEntryRepository.findById(id);
        if (entryOpt.isEmpty() || !entryOpt.get().getUser().equals(userOpt.get())) {
            return ResponseEntity.notFound().build();
        }
        TimeEntry entry = entryOpt.get();
        entry.setProject(timeEntryDetails.getProject());
        entry.setClient(timeEntryDetails.getClient());
        entry.setStartTime(timeEntryDetails.getStartTime());
        entry.setEndTime(timeEntryDetails.getEndTime());
        entry.setDuration(timeEntryDetails.getDuration());
        entry.setDescription(timeEntryDetails.getDescription());
        TimeEntry updated = timeEntryRepository.save(entry);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeEntry(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<TimeEntry> entryOpt = timeEntryRepository.findById(id);
        if (entryOpt.isEmpty() || !entryOpt.get().getUser().equals(userOpt.get())) {
            return ResponseEntity.notFound().build();
        }
        timeEntryRepository.delete(entryOpt.get());
        return ResponseEntity.noContent().build();
    }
}
