package com.openclassrooms.starterjwt.exception;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class NotFoundExceptionTest {

    @Test
    void testNotFoundException() throws Exception {
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(new NotFoundException()).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/not-found"))
                .andExpect(MockMvcResultMatchers.status().is(HttpStatus.NOT_FOUND.value()));
    }
}