package com.jeromewirth.backend.controller;

import com.jeromewirth.backend.model.Role;
import com.jeromewirth.backend.model.User;
import com.jeromewirth.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testRegisterUser() throws Exception {
        String signupRequest = """
                {
                    "email": "test@example.com",
                    "password": "password123"
                }
                """;

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(signupRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered successfully!"))
                .andExpect(jsonPath("$.user.email").value("test@example.com"))
                .andExpect(jsonPath("$.user.role").value("EMPLOYEE"));
    }

    @Test
    public void testRegisterUserDuplicateEmail() throws Exception {
        // Create existing user
        User existingUser = new User("existing@example.com", passwordEncoder.encode("pass"), Role.EMPLOYEE);
        userRepository.save(existingUser);

        String signupRequest = """
                {
                    "email": "existing@example.com",
                    "password": "password123"
                }
                """;

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(signupRequest))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Error: Email is already in use!"));
    }

    @Test
    public void testLoginUser() throws Exception {
        // Register user first
        User user = new User("login@example.com", passwordEncoder.encode("password123"), Role.EMPLOYEE);
        userRepository.save(user);

        String loginRequest = """
                {
                    "email": "login@example.com",
                    "password": "password123"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.user.email").value("login@example.com"));
    }

    // @Test
    // public void testLoginUserInvalidCredentials() throws Exception {
    // String loginRequest = """
    // {
    // "email": "nonexistent@example.com",
    // "password": "wrongpass"
    // }
    // """;

    // mockMvc.perform(post("/api/auth/login")
    // .contentType(MediaType.APPLICATION_JSON)
    // .content(loginRequest))
    // .andExpect(status().is(401));
    // }
}
