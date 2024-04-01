package com.openclassrooms.starterjwt.security.services;

import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

class UserDetailsImplTest {

    @Test
    void testGetAuthorities() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        assertNotNull(authorities);
        assertTrue(authorities.isEmpty());
    }

    @Test
    void testIsAccountNonExpired() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        assertTrue(userDetails.isAccountNonExpired());
    }

    @Test
    void testIsAccountNonLocked() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        assertTrue(userDetails.isAccountNonLocked());
    }

    @Test
    void testIsCredentialsNonExpired() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        assertTrue(userDetails.isCredentialsNonExpired());
    }

    @Test
    void testIsEnabled() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        assertTrue(userDetails.isEnabled());
    }

    @Test
    void testEquals() {
        UserDetailsImpl userDetails1 = UserDetailsImpl.builder().id(1L).build();
        UserDetailsImpl userDetails2 = UserDetailsImpl.builder().id(1L).build();
        UserDetailsImpl userDetails3 = UserDetailsImpl.builder().id(2L).build();

        assertEquals(userDetails1, userDetails2);
        assertEquals(userDetails1, userDetails1); // teste la ligne 62
        assertNotEquals(userDetails1, userDetails3);
    }

    @Test
    void testUserAttributes() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(1L)
                .username("username")
                .firstName("firstName")
                .lastName("lastName")
                .admin(true)
                .password("password")
                .build();

        assertEquals(1L, userDetails.getId());
        assertEquals("username", userDetails.getUsername());
        assertEquals("firstName", userDetails.getFirstName());
        assertEquals("lastName", userDetails.getLastName());
        assertTrue(userDetails.getAdmin());
        assertEquals("password", userDetails.getPassword());
    }
}