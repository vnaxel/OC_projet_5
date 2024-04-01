package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

class SessionControllerTest {

    @Mock
    private SessionService sessionService;

    @Mock
    private SessionMapper sessionMapper;

    @InjectMocks
    private SessionController sessionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findById_ValidId_ReturnsSessionDto() {
        // Arrange
        long id = 1L;
        Session session = new Session();
        session.setId(id);
        SessionDto sessionDto = new SessionDto();
        sessionDto.setId(id);

        when(sessionService.getById(id)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        // Act
        ResponseEntity<?> response = sessionController.findById(String.valueOf(id));

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sessionDto, response.getBody());
    }

    @Test
    void findById_InvalidId_ReturnsNotFound() {
        long id = 1L;

        when(sessionService.getById(id)).thenReturn(null);

        ResponseEntity<?> response = sessionController.findById(String.valueOf(id));

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void findAll_ReturnsListOfSessionDto() {

        List<Session> sessions = new ArrayList<>();
        sessions.add(
                Session.builder()
                        .id(1L)
                        .name("Session 1")
                        .description("Description 1")
                        .teacher(
                                Teacher.builder()
                                        .id(1L)
                                        .firstName("Teacher")
                                        .lastName("One")
                                .build())
                        .users(null)
                .build());
        sessions.add(
                Session.builder()
                        .id(2L)
                        .name("Session 2")
                        .description("Description 2")
                        .teacher(
                                Teacher.builder()
                                        .id(2L)
                                        .firstName("Teacher")
                                        .lastName("Two")
                                .build())
                        .users(null)
                .build());

        List<SessionDto> sessionDtos = new ArrayList<>();
        sessionDtos.add(new SessionDto(
                1L,
                "Session 1",
                null,
                1L,
                "Description 1",
                null, null,
                null
        ));
        sessionDtos.add(new SessionDto(
                2L,
                "Session 2",
                null,
                2L,
                "Description 2",
                null,
                null,
                null));

        when(sessionService.findAll()).thenReturn(sessions);
        when(sessionMapper.toDto(sessions)).thenReturn(sessionDtos);

        ResponseEntity<?> response = sessionController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sessionDtos, response.getBody());
    }

    @Test
    void create_ValidSessionDto_ReturnsSessionDto() {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setId(1L);
        sessionDto.setName("Session 1");
        sessionDto.setDescription("Description 1");

        Session session = new Session();
        session.setId(1L);
        session.setName("Session 1");
        session.setDescription("Description 1");

        when(sessionMapper.toEntity(sessionDto)).thenReturn(session);
        when(sessionService.create(session)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        ResponseEntity<?> response = sessionController.create(sessionDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sessionDto, response.getBody());
    }

    @Test
    void update_ValidIdAndSessionDto_ReturnsSessionDto() {
        long id = 1L;
        SessionDto sessionDto = new SessionDto();
        sessionDto.setId(id);
        sessionDto.setName("Session 1");
        sessionDto.setDescription("Description 1");

        Session session = new Session();
        session.setId(id);
        session.setName("Session 1");
        session.setDescription("Description 1");

        when(sessionMapper.toEntity(sessionDto)).thenReturn(session);
        when(sessionService.update(id, session)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        ResponseEntity<?> response = sessionController.update(String.valueOf(id), sessionDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sessionDto, response.getBody());
    }

    @Test
    void update_InvalidId_ReturnsBadRequest() {
        long id = 1L;
        SessionDto sessionDto = new SessionDto();
        sessionDto.setId(id);
        sessionDto.setName("Session 1");
        sessionDto.setDescription("Description 1");

        ResponseEntity<?> response = sessionController.update("invalid", sessionDto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void delete_ValidId_ReturnsOk() {
        long id = 1L;
        Session session = new Session();
        session.setId(id);

        when(sessionService.getById(id)).thenReturn(session);

        ResponseEntity<?> response = sessionController.delete(String.valueOf(id));

        verify(sessionService, times(1)).delete(id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void delete_InvalidId_ReturnsNotFound() {
        long id = 1L;

        when(sessionService.getById(id)).thenReturn(null);

        ResponseEntity<?> response = sessionController.delete(String.valueOf(id));

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void delete_InvalidId_ReturnsBadRequest() {
        ResponseEntity<?> response = sessionController.delete("invalid");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void participate_ValidIdAndUserId_ReturnsOk() {
        long id = 1L;
        long userId = 1L;

        ResponseEntity<?> response = sessionController.participate(String.valueOf(id), String.valueOf(userId));

        verify(sessionService, times(1)).participate(id, userId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void participate_InvalidUserId_ReturnsBadRequest() {
        long id = 1L;
        long userId = 1L;

        ResponseEntity<?> response = sessionController.participate(String.valueOf(id), "invalid");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void noLongerParticipate_ValidIdAndUserId_ReturnsOk() {
        long id = 1L;
        long userId = 1L;

        ResponseEntity<?> response = sessionController.noLongerParticipate(String.valueOf(id), String.valueOf(userId));

        verify(sessionService, times(1)).noLongerParticipate(id, userId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void noLongerParticipate_InvalidUserId_ReturnsBadRequest() {
        long id = 1L;

        ResponseEntity<?> response = sessionController.noLongerParticipate(String.valueOf(id), "invalid");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void participate_InvalidId_ReturnsBadRequest() {
        long id = 1L;
        long userId = 1L;

        ResponseEntity<?> response = sessionController.participate("invalid", String.valueOf(userId));

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}