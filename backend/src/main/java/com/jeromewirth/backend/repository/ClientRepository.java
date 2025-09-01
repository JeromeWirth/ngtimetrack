package com.jeromewirth.backend.repository;

import com.jeromewirth.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
