package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class TeacherControllerTest {

    @Mock
    private TeacherService teacherService;

    @Mock
    private TeacherMapper teacherMapper;

    @InjectMocks
    private TeacherController teacherController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindById() {
        // Arrange
        Long id = 1L;
        Teacher teacher = new Teacher();
        teacher.setId(id);
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setId(id);

        when(teacherService.findById(id)).thenReturn(teacher);
        when(teacherMapper.toDto(teacher)).thenReturn(teacherDto);

        // Act
        ResponseEntity<?> response = teacherController.findById(id.toString());

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(teacherDto, response.getBody());
    }

    @Test
    public void testFindById_InvalidId() {
        // Arrange
        String invalidId = "invalid";

        // Act
        ResponseEntity<?> response = teacherController.findById(invalidId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void testFindById_NotFound() {
        // Arrange
        Long id = 1L;

        when(teacherService.findById(id)).thenReturn(null);

        // Act
        ResponseEntity<?> response = teacherController.findById(id.toString());

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testFindAll() {
        // Arrange
        List<Teacher> teachers = new ArrayList<>();
        teachers.add(Teacher.builder()
                .id(1L)
                .firstName("Teacher")
                .lastName("One")
                .build());
        teachers.add(Teacher.builder()
                .id(2L)
                .firstName("Teacher")
                .lastName("Two")
                .build());

        List<TeacherDto> teacherDtos = new ArrayList<>();
        teacherDtos.add(new TeacherDto(
                1L,
                "Teacher",
                "One",
                null,
                null
        ));
        teacherDtos.add(new TeacherDto(
                2L,
                "Teacher",
                "Two",
                null,
                null
        ));

        when(teacherService.findAll()).thenReturn(teachers);
        when(teacherMapper.toDto(teachers)).thenReturn(teacherDtos);

        // Act
        ResponseEntity<?> response = teacherController.findAll();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(teacherDtos, response.getBody());
    }
}