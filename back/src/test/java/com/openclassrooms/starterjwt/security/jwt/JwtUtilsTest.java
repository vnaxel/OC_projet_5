package com.openclassrooms.starterjwt.security.jwt;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ActiveProfiles;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@ActiveProfiles("test")
class JwtUtilsTest {

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${oc.app.jwtSecret}")
    private String jwtSecret;

    @Value("${oc.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Test
    void testGenerateJwtToken() {
        Authentication authentication = Mockito.mock(Authentication.class);
        UserDetailsImpl userDetails = Mockito.mock(UserDetailsImpl.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("test");

        String token = jwtUtils.generateJwtToken(authentication);

        assertEquals("test", jwtUtils.getUserNameFromJwtToken(token));
    }

    @Test
    void testValidateJwtToken() {
        Authentication authentication = Mockito.mock(Authentication.class);
        UserDetailsImpl userDetails = Mockito.mock(UserDetailsImpl.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("test");

        String token = jwtUtils.generateJwtToken(authentication);

        assertTrue(jwtUtils.validateJwtToken(token));
    }

    @Test
    void testValidateJWTTokenWithInvalidJToken() {
        boolean result = jwtUtils.validateJwtToken("invalidToken");

        assertFalse(result);
    }

    @Test
    void testValidateJWTTokenWithExpiredToken() {
        String token = Jwts.builder().setSubject("test")
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() - jwtExpirationMs - 1))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        assertFalse(jwtUtils.validateJwtToken(token));
    }

    @Test
    void testValidateJWTTokenWithInvalidSignature() {
        String token = Jwts.builder().setSubject("test")
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, "invalidSecret")
                .compact();

        assertFalse(jwtUtils.validateJwtToken(token));
    }

    @Test
    void testValidateJWTTokenWithUnsupportedToken() {
        String token = Jwts.builder().setSubject("test")
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .compact();

        assertFalse(jwtUtils.validateJwtToken(token));
    }

    @Test
    void testValidateJWTTokenWithInvalidClaim() {
        assertFalse(jwtUtils.validateJwtToken(""));
    }

}