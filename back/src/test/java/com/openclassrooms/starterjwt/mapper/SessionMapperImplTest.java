package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.TeacherService;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SessionMapperImplTest {

    Session session;
    SessionDto sessionDto;
    Teacher teacher;
    List<User> users;
    @Mock
    TeacherService teacherService;
    @Mock
    UserService userService;

    @InjectMocks
    SessionMapperImpl sessionMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        teacher = Teacher.builder()
                .id(1L)
                .firstName("firstName")
                .lastName("lastName")
                .build();
        when(teacherService.findById(1L)).thenReturn(teacher);

        User user1 = User.builder()
                .id(1L)
                .firstName("firstName")
                .lastName("lastName")
                .password("password")
                .email("email")
                .build();
        User user2 = User.builder()
                .id(2L)
                .firstName("firstName")
                .lastName("lastName")
                .password("password")
                .email("email")
                .build();
        when(userService.findById(1L)).thenReturn(user1);
        when(userService.findById(2L)).thenReturn(user2);

        users = new ArrayList<>();
        users.add(user1);
        users.add(user2);
        session = Session.builder()
                .id(1L)
                .name("name")
                .date(new Date(1711951704))
                .description("description")
                .teacher(teacher)
                .users(users)
                .build();

        sessionDto = new SessionDto();
        sessionDto.setId(1L);
        sessionDto.setName("name");
        sessionDto.setDate(new Date(1711951704));
        sessionDto.setUsers(users.stream().map(User::getId).collect(Collectors.toList()));
        sessionDto.setDescription("description");
        sessionDto.setTeacher_id(1L);
    }

    @Test
    void toEntity() {
        Session mappedSession = sessionMapper.toEntity(sessionDto);

        assertEquals(session.getId(), mappedSession.getId());
        assertEquals(session.getName(), mappedSession.getName());
        assertEquals(session.getDate(), mappedSession.getDate());
        assertEquals(session.getDescription(), mappedSession.getDescription());
        assertEquals(session.getTeacher(), mappedSession.getTeacher());
        assertEquals(session.getUsers(), mappedSession.getUsers());
    }

    @Test
    void toDto() {
        SessionDto mappedSessionDto = sessionMapper.toDto(session);

        assertEquals(sessionDto.getId(), mappedSessionDto.getId());
        assertEquals(sessionDto.getName(), mappedSessionDto.getName());
        assertEquals(sessionDto.getDate(), mappedSessionDto.getDate());
        assertEquals(sessionDto.getDescription(), mappedSessionDto.getDescription());
        assertEquals(sessionDto.getTeacher_id(), mappedSessionDto.getTeacher_id());
        assertEquals(sessionDto.getUsers(), mappedSessionDto.getUsers());
    }

    @Test
    void toDtoEmpty() {
        SessionDto mappedSessionDto = sessionMapper.toDto((Session) null);

        assertNull(mappedSessionDto);
    }

    @Test
    void toEntityEmpty() {
        Session mappedSession = sessionMapper.toEntity((SessionDto) null);

        assertNull(mappedSession);
    }

    @Test
    void toEntityList() {
        List<Session> sessions = new ArrayList<>();
        sessions.add(session);

        List<SessionDto> sessionDtos = sessionMapper.toDto(sessions);

        assertEquals(sessions.size(), sessionDtos.size());
    }

    @Test
    void toDtoList() {
        List<SessionDto> sessionDtos = new ArrayList<>();
        sessionDtos.add(sessionDto);

        List<Session> sessions = sessionMapper.toEntity(sessionDtos);

        assertEquals(sessionDtos.size(), sessions.size());
    }

    @Test
    void toDtoListEmpty() {
        List<Session> sessions = null;
        assertNull(sessionMapper.toDto(sessions));
    }

    @Test
    void toEntityListEmpty() {
        List<SessionDto> sessionDtos = null;
        assertNull(sessionMapper.toEntity(sessionDtos));
    }

    @Test
    void sessionTeacherId_sessionTeacherNull() {
        session.setTeacher(null);
        sessionDto = sessionMapper.toDto(session);
        assertNull(sessionDto.getTeacher_id());
    }

    @Test
    void sessionTeacherId_sessionTeacherIdNull() {
        session.getTeacher().setId(null);
        sessionDto = sessionMapper.toDto(session);
        assertNull(sessionDto.getTeacher_id());
    }


}