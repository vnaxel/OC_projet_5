package com.openclassrooms.starterjwt.payload.response;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JwtResponseTest {

    @Test
    void testJwtResponseConstructor() {
        String accessToken = "sampleAccessToken";
        Long id = 1L;
        String username = "sampleUsername";
        String firstName = "sampleFirstName";
        String lastName = "sampleLastName";
        Boolean admin = true;

        JwtResponse jwtResponse = new JwtResponse(accessToken, id, username, firstName, lastName, admin);

        assertEquals(accessToken, jwtResponse.getToken());
        assertEquals("Bearer", jwtResponse.getType());
        assertEquals(id, jwtResponse.getId());
        assertEquals(username, jwtResponse.getUsername());
        assertEquals(firstName, jwtResponse.getFirstName());
        assertEquals(lastName, jwtResponse.getLastName());
        assertEquals(admin, jwtResponse.getAdmin());
    }

    @Test
    void testTokenSetter() {
        String accessToken = "sampleAccessToken";
        JwtResponse jwtResponse = new JwtResponse("", 0L, "", "", "", false);
        jwtResponse.setToken(accessToken);
        assertEquals(accessToken, jwtResponse.getToken());
    }
}