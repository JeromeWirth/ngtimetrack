package com.jeromewirth.backend.model;

import jakarta.persistence.*;
import java.util.Set;
import com.jeromewirth.backend.model.VacationDay;
import com.jeromewirth.backend.model.TimeEntry;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private Integer vacationBalance = 30; // Default 30 days

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private Set<Project> projects;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<TimeEntry> timeEntries;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<VacationDay> vacationDays;

    // Constructors
    public User() {
    }

    public User(String email, String password, Role role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Integer getVacationBalance() {
        return vacationBalance;
    }

    public void setVacationBalance(Integer vacationBalance) {
        this.vacationBalance = vacationBalance;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<TimeEntry> getTimeEntries() {
        return timeEntries;
    }

    public void setTimeEntries(Set<TimeEntry> timeEntries) {
        this.timeEntries = timeEntries;
    }

    public Set<VacationDay> getVacationDays() {
        return vacationDays;
    }

    public void setVacationDays(Set<VacationDay> vacationDays) {
        this.vacationDays = vacationDays;
    }
}
