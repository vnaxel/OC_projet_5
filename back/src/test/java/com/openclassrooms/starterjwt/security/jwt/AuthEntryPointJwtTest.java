package com.openclassrooms.starterjwt.security.jwt;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.AuthenticationException;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.mockito.Mockito.*;

@SpringJUnitConfig
@SpringBootTest
class AuthEntryPointJwtTest {

    @MockBean
    private HttpServletRequest request;

    @MockBean
    private HttpServletResponse response;

    @MockBean
    private AuthenticationException authException;

    @Test
    void commence_ShouldReturnUnauthorizedError() throws Exception {
        AuthEntryPointJwt authEntryPointJwt = new AuthEntryPointJwt();
        when(authException.getMessage()).thenReturn("Unauthorized error");
        ServletOutputStream mockServletOutputStream = mock(ServletOutputStream.class);
        when(response.getOutputStream()).thenReturn(mockServletOutputStream);
        authEntryPointJwt.commence(request, response, authException);
        verify(response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}