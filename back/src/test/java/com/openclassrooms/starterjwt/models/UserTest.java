package com.openclassrooms.starterjwt.models;

import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
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
class UserTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testUserEntity() {
        User user = User.builder()
                .email("test@example.com")
                .lastName("Doe")
                .firstName("John")
                .password("password")
                .admin(true)
                .build();

        User savedUser = userRepository.saveAndFlush(user);
        assertNotNull(savedUser.getId());
        assertEquals("test@example.com", savedUser.getEmail());
        assertEquals("Doe", savedUser.getLastName());
        assertEquals("John", savedUser.getFirstName());
        assertEquals("password", savedUser.getPassword());
        assertTrue(savedUser.isAdmin());
        assertNotNull(savedUser.getCreatedAt());
        assertNotNull(savedUser.getUpdatedAt());
        assertEquals(savedUser.toString(), userRepository.findById(savedUser.getId()).get().toString());
    }

    @Test
    void testUserEqualsMethod() {
        User user1 = User.builder()
                .id(1L)
                .email("test@example.com")
                .lastName("Doe")
                .firstName("John")
                .password("password")
                .admin(true)
                .createdAt(null)
                .updatedAt(null)
                .build();

        User user2 = User.builder()
                .id(1L)
                .email("test@example.com")
                .lastName("Doe")
                .firstName("John")
                .password("password")
                .admin(true)
                .createdAt(null)
                .updatedAt(null)
                .build();

        assertTrue(user1.equals(user2));
    }
}