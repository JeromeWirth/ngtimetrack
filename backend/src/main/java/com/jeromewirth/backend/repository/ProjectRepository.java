package com.jeromewirth.backend.repository;

import com.jeromewirth.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
