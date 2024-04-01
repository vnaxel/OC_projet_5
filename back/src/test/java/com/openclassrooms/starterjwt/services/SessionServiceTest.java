package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SessionService sessionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateSession() {
        Session session = new Session();
        when(sessionRepository.save(session)).thenReturn(session);

        Session createdSession = sessionService.create(session);

        assertNotNull(createdSession);
        assertEquals(session, createdSession);
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    void testDeleteSession() {
        Long sessionId = 1L;

        sessionService.delete(sessionId);

        verify(sessionRepository, times(1)).deleteById(sessionId);
    }

    @Test
    void testFindAllSessions() {
        List<Session> sessions = new ArrayList<>();
        when(sessionRepository.findAll()).thenReturn(sessions);

        List<Session> foundSessions = sessionService.findAll();

        assertNotNull(foundSessions);
        assertEquals(sessions, foundSessions);
        verify(sessionRepository, times(1)).findAll();
    }

    @Test
    void testGetSessionById() {
        Long sessionId = 1L;
        Session session = new Session();
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        Session foundSession = sessionService.getById(sessionId);

        assertNotNull(foundSession);
        assertEquals(session, foundSession);
        verify(sessionRepository, times(1)).findById(sessionId);
    }

    @Test
    void testUpdateSession() {
        Long sessionId = 1L;
        Session session = new Session();
        session.setId(sessionId);
        when(sessionRepository.save(session)).thenReturn(session);

        Session updatedSession = sessionService.update(sessionId, session);

        assertNotNull(updatedSession);
        assertEquals(session, updatedSession);
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    void testParticipateInSession() {
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();
        User user = new User();
        session.setId(sessionId);
        session.setUsers(new ArrayList<>());
        user.setId(userId);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        sessionService.participate(sessionId, userId);

        assertTrue(session.getUsers().contains(user));
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    void testParticipateInSession_ThrowsNotFoundException() {
        Long sessionId = 1L;
        Long userId = 1L;
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> sessionService.participate(sessionId, userId));
        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    void testParticipateInSession_ThrowsBadRequestException() {
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();
        User user = new User();
        session.setId(sessionId);
        session.setUsers(new ArrayList<>());
        user.setId(userId);
        session.getUsers().add(user);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertThrows(BadRequestException.class, () -> sessionService.participate(sessionId, userId));
        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    void testNoLongerParticipateInSession() {
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();
        User user = new User();
        session.setId(sessionId);
        user.setId(userId);
        List<User> users = new ArrayList<>();
        users.add(user);
        session.setUsers(users);

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        sessionService.noLongerParticipate(sessionId, userId);

        assertFalse(session.getUsers().contains(user));
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    void testNoLongerParticipateInSession_ThrowsNotFoundException() {
        Long sessionId = 1L;
        Long userId = 1L;
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> sessionService.noLongerParticipate(sessionId, userId));
        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    void testNoLongerParticipateInSession_ThrowsBadRequestException() {
        Long sessionId = 1L;
        Long userId = 1L;
        Session session = new Session();
        User user = new User();
        session.setId(sessionId);
        List<User> users = new ArrayList<>();
        session.setUsers(users);
        user.setId(userId);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        assertThrows(BadRequestException.class, () -> sessionService.noLongerParticipate(sessionId, userId));
        verify(sessionRepository, never()).save(any(Session.class));
    }
}