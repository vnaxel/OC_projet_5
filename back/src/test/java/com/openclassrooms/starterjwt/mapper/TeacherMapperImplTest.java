package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TeacherMapperImplTest {

    Teacher teacher;
    TeacherDto teacherDto;

    @BeforeEach
    void setUp() {
        teacher = Teacher.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .createdAt(null)
                .updatedAt(null)
                .build();
        teacherDto = new TeacherDto();
        teacherDto.setId(1L);
        teacherDto.setFirstName("John");
        teacherDto.setLastName("Doe");
        teacherDto.setCreatedAt(null);
        teacherDto.setUpdatedAt(null);
    }

    @Test
    void toEntity() {
        TeacherMapperImpl teacherMapper = new TeacherMapperImpl();

        Teacher mappedTeacher = teacherMapper.toEntity(teacherDto);

        assertEquals(teacher.getId(), mappedTeacher.getId());
        assertEquals(teacher.getFirstName(), mappedTeacher.getFirstName());
        assertEquals(teacher.getLastName(), mappedTeacher.getLastName());
        assertEquals(teacher.getCreatedAt(), mappedTeacher.getCreatedAt());
        assertEquals(teacher.getUpdatedAt(), mappedTeacher.getUpdatedAt());
    }

    @Test
    void toEntityNull() {
        TeacherDto teacherDto = null;
        TeacherMapperImpl teacherMapper = new TeacherMapperImpl();
        assertNull(teacherMapper.toEntity(teacherDto));
    }

    @Test
    void toDto() {
        TeacherMapperImpl teacherMapper = new TeacherMapperImpl();

        TeacherDto mappedTeacherDto = teacherMapper.toDto(teacher);

        assertEquals(teacherDto.getId(), mappedTeacherDto.getId());
        assertEquals(teacherDto.getFirstName(), mappedTeacherDto.getFirstName());
        assertEquals(teacherDto.getLastName(), mappedTeacherDto.getLastName());
        assertEquals(teacherDto.getCreatedAt(), mappedTeacherDto.getCreatedAt());
        assertEquals(teacherDto.getUpdatedAt(), mappedTeacherDto.getUpdatedAt());
    }

    @Test
    void toDtoNull() {
        Teacher teacher = null;
        TeacherMapperImpl teacherMapper = new TeacherMapperImpl();
        assertNull(teacherMapper.toDto(teacher));
    }

    @Test
    void ToEntityList() {
        List<TeacherDto> teacherDtoList = new ArrayList<>();
        teacherDtoList.add(teacherDto);
        teacherDtoList.add(teacherDto);
        teacherDtoList.add(teacherDto);
        List<Teacher> teacherList = new ArrayList<>();
        teacherList.add(teacher);
        teacherList.add(teacher);
        teacherList.add(teacher);

        TeacherMapperImpl teacherMapper = new TeacherMapperImpl();

        List<Teacher> mappedTeachers = teacherMapper.toEntity(teacherDtoList);

        assertEquals(teacherList, mappedTeachers);
    }

    @Test
    void ToEntityListNull() {
        List<TeacherDto> teacherDtoList = null;
        TeacherMapperImpl teacherMapper = new TeacherMapperImpl();
        assertNull(teacherMapper.toEntity(teacherDtoList));
    }

    @Test
    void ToDtoList() {
        List<Teacher> teacherList = new ArrayList<>();
        teacherList.add(teacher);
        teacherList.add(teacher);
        teacherList.add(teacher);
        List<TeacherDto> teacherDtoList = new ArrayList<>();
        teacherDtoList.add(teacherDto);
        teacherDtoList.add(teacherDto);
        teacherDtoList.add(teacherDto);

        TeacherMapperImpl teacherMapper = new TeacherMapperImpl();

        List<TeacherDto> mappedTeacherDtos = teacherMapper.toDto(teacherList);

        assertEquals(teacherDtoList, mappedTeacherDtos);
    }

    @Test
    void ToDtoListNull() {
        List<Teacher> teacherList = null;
        TeacherMapperImpl teacherMapper = new TeacherMapperImpl();
        assertNull(teacherMapper.toDto(teacherList));
    }
}