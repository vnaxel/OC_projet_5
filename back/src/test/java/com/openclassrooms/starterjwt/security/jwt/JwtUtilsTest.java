package com.openclassrooms.starterjwt.security.jwt;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@SpringBootTest
@ActiveProfiles("test")
class JwtUtilsTest {

    @Autowired
    private JwtUtils jwtUtils;

    @Test
    void testGenerateJwtToken() {
        // Mock the SecurityContextHolder
        Authentication authentication = Mockito.mock(Authentication.class);
        UserDetailsImpl userDetails = Mockito.mock(UserDetailsImpl.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("test");

        // Test the method
        String token = jwtUtils.generateJwtToken(authentication);

        // Assert
        assertEquals("test", jwtUtils.getUserNameFromJwtToken(token));
    }

    @Test
    void testValidateJwtToken() {
        // Mock the SecurityContextHolder
        Authentication authentication = Mockito.mock(Authentication.class);
        UserDetailsImpl userDetails = Mockito.mock(UserDetailsImpl.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("test");

        // Test the method
        String token = jwtUtils.generateJwtToken(authentication);

        // Assert
        assertTrue(jwtUtils.validateJwtToken(token));
    }

}