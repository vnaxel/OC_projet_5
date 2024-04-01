package com.openclassrooms.starterjwt.models;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
        "spring.jpa.show-sql=true",
        "spring.jpa.properties.hibernate.format_sql=true",
})
class TeacherTest {

    @Autowired
    private TeacherRepository teacherRepository;

    @Test
    void it_should_save_teacher() {
        // Given
        Teacher teacher = Teacher.builder()
                .lastName("Doe")
                .firstName("John")
                .build();

        // When
        teacherRepository.saveAndFlush(teacher);

        // Then
        assertNotNull(teacher.getId());
        assertEquals("Doe", teacher.getLastName());
        assertEquals("John", teacher.getFirstName());
        assertNotNull(teacher.getCreatedAt());
        assertNotNull(teacher.getUpdatedAt());
        assertEquals(teacher.toString(), teacherRepository.findById(teacher.getId()).get().toString());
    }
}