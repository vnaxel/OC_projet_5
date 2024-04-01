package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserControllerTest {

    @Test
    void testFindById() {
        // Arrange
        UserService mockUserService = mock(UserService.class);
        UserMapper mockUserMapper = mock(UserMapper.class);
        UserController userController = new UserController(mockUserService, mockUserMapper);
        String id = "1";
        User user = new User();
        user.setId(Long.valueOf(id));
        when(mockUserService.findById(Long.valueOf(id))).thenReturn(user);
        UserDto expectedUserDto = new UserDto();
        when(mockUserMapper.toDto(user)).thenReturn(expectedUserDto);

        // Act
        ResponseEntity<?> response = userController.findById(id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedUserDto, response.getBody());
    }

    @Test
    void testFindByIdWithNumberFormatException() {
        // Arrange
        UserService mockUserService = mock(UserService.class);
        UserMapper mockUserMapper = mock(UserMapper.class);
        UserController userController = new UserController(mockUserService, mockUserMapper);
        String id = "not-a-number";

        // Act
        ResponseEntity<?> response = userController.findById(id);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void testFindByIdWithNullUser() {
        // Arrange
        UserService mockUserService = mock(UserService.class);
        UserMapper mockUserMapper = mock(UserMapper.class);
        UserController userController = new UserController(mockUserService, mockUserMapper);
        String id = "1";
        when(mockUserService.findById(Long.valueOf(id))).thenReturn(null);

        // Act
        ResponseEntity<?> response = userController.findById(id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    // ...

    @Test
    void testDelete() {
        // Arrange
        UserService mockUserService = mock(UserService.class);
        UserMapper mockUserMapper = mock(UserMapper.class);
        UserController userController = new UserController(mockUserService, mockUserMapper);
        String id = "1";
        User user = new User("email", "Doe", "John", "password", false);
        user.setId(Long.valueOf(id));
        when(mockUserService.findById(Long.valueOf(id))).thenReturn(user);

        // Mock the SecurityContextHolder
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        UserDetails mockUserDetails = mock(UserDetails.class);
        when(mockUserDetails.getUsername()).thenReturn("email");
        when(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).thenReturn(mockUserDetails);

        // Act
        ResponseEntity<?> response = userController.delete(id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testDeleteWithNumberFormatException() {
        // Arrange
        UserService mockUserService = mock(UserService.class);
        UserMapper mockUserMapper = mock(UserMapper.class);
        UserController userController = new UserController(mockUserService, mockUserMapper);
        String id = "not-a-number";

        // Act
        ResponseEntity<?> response = userController.delete(id);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void testDeleteWithNullUser() {
        // Arrange
        UserService mockUserService = mock(UserService.class);
        UserMapper mockUserMapper = mock(UserMapper.class);
        UserController userController = new UserController(mockUserService, mockUserMapper);
        String id = "1";
        when(mockUserService.findById(Long.valueOf(id))).thenReturn(null);

        // Act
        ResponseEntity<?> response = userController.delete(id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testDeleteWithUnauthorizedUser() {
        // Arrange
        UserService mockUserService = mock(UserService.class);
        UserMapper mockUserMapper = mock(UserMapper.class);
        UserController userController = new UserController(mockUserService, mockUserMapper);
        String id = "1";
        User user = new User("email", "Doe", "John", "password", false);
        user.setId(Long.valueOf(id));
        when(mockUserService.findById(Long.valueOf(id))).thenReturn(user);

        // Mock the SecurityContextHolder
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        UserDetails mockUserDetails = mock(UserDetails.class);
        when(mockUserDetails.getUsername()).thenReturn("another-email");
        when(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).thenReturn(mockUserDetails);

        // Act
        ResponseEntity<?> response = userController.delete(id);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
}