package com.openclassrooms.starterjwt.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class TeacherServiceTest {

    @Mock
    private TeacherRepository teacherRepository;

    private TeacherService teacherService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        teacherService = new TeacherService(teacherRepository);
    }

    @Test
    void testFindAll() {
        // Arrange
        List<Teacher> teachers = new ArrayList<>();
        teachers.add(new Teacher(1L, "John", "Doe", null, null));
        teachers.add(new Teacher(2L, "Jane", "Smith", null, null));
        teachers.add(new Teacher(3L, "Alice", "Johnson", null, null));
        when(teacherRepository.findAll()).thenReturn(teachers);

        // Act
        List<Teacher> result = teacherService.findAll();

        // Assert
        assertEquals(teachers, result);
    }

    @Test
    void testFindById() {
        // Arrange
        Long id = 1L;
        Teacher teacher = new Teacher(1L, "John", "Doe", null, null);
        when(teacherRepository.findById(id)).thenReturn(Optional.of(teacher));

        // Act
        Teacher result = teacherService.findById(id);

        // Assert
        assertEquals(teacher, result);
    }
}