package com.openclassrooms.starterjwt.exception;

import com.openclassrooms.starterjwt.controllers.SessionController;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus; // Add this import statement
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class BadRequestExceptionTest {

    @Test
    void testBadRequestException() throws Exception {
        SessionService sessionService = new SessionService(null, null);
        SessionController sessionController = new SessionController(sessionService, null);
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(sessionController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/session/false-id"))
                .andExpect(MockMvcResultMatchers.status().is(HttpStatus.BAD_REQUEST.value()));
    }
}