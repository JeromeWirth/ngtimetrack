package com.jeromewirth.backend.controller;

import com.jeromewirth.backend.model.Role;
import com.jeromewirth.backend.model.User;
import com.jeromewirth.backend.model.VacationDay;
import com.jeromewirth.backend.repository.UserRepository;
import com.jeromewirth.backend.repository.VacationDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vacations")
@CrossOrigin(origins = "*")
public class VacationDayController {

    @Autowired
    VacationDayRepository vacationDayRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getVacations(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        User user = userOpt.get();
        if (user.getRole() == Role.HR || user.getRole() == Role.ADMIN) {
            List<VacationDay> vacations = vacationDayRepository.findAll();
            return ResponseEntity.ok(vacations);
        } else {
            List<VacationDay> vacations = vacationDayRepository.findByUser(user);
            return ResponseEntity.ok(vacations);
        }
    }

    @PostMapping
    public ResponseEntity<VacationDay> createVacation(@RequestBody VacationDay vacation,
            Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        vacation.setUser(userOpt.get());
        VacationDay saved = vacationDayRepository.save(vacation);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HR') or hasRole('ADMIN')")
    public ResponseEntity<VacationDay> updateVacation(@PathVariable Long id, @RequestBody VacationDay vacationDetails) {
        Optional<VacationDay> vacationOpt = vacationDayRepository.findById(id);
        if (vacationOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        VacationDay vacation = vacationOpt.get();
        vacation.setStartDate(vacationDetails.getStartDate());
        vacation.setEndDate(vacationDetails.getEndDate());
        vacation.setType(vacationDetails.getType());
        vacation.setStatus(vacationDetails.getStatus());
        vacation.setApprover(vacationDetails.getApprover());
        VacationDay updated = vacationDayRepository.save(vacation);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVacation(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<VacationDay> vacationOpt = vacationDayRepository.findById(id);
        if (vacationOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        VacationDay vacation = vacationOpt.get();
        if (!vacation.getUser().equals(userOpt.get()) && userOpt.get().getRole() != Role.HR
                && userOpt.get().getRole() != Role.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        vacationDayRepository.delete(vacation);
        return ResponseEntity.noContent().build();
    }
}
