package com.jeromewirth.backend.repository;

import com.jeromewirth.backend.model.User;
import com.jeromewirth.backend.model.VacationDay;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VacationDayRepository extends JpaRepository<VacationDay, Long> {
    List<VacationDay> findByUser(User user);
}
