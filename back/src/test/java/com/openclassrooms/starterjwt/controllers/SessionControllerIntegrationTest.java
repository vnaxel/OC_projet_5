package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SessionControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser // Indique à Spring de gerer l'authentification de la requete
    void testFindById() throws Exception {
        mockMvc.perform(get("/api/session/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Yoga"))
                .andExpect(jsonPath("$.description").value("Cours de yoga"));
    }

    @Test
    @WithMockUser
    void testFindByIdWithInvalidId() throws Exception {
        mockMvc.perform(get("/api/session/not-a-number"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void testFindByIdWithNonExistingSession() throws Exception {
        mockMvc.perform(get("/api/session/-1"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    void testFindAll() throws Exception {
        mockMvc.perform(get("/api/session"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Yoga"))
                .andExpect(jsonPath("$[0].description").value("Cours de yoga"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("Pilates"))
                .andExpect(jsonPath("$[1].description").value("Cours de pilates"));
    }
}
