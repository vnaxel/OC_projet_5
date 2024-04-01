package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserMapperImplTest {

    UserDto userDto;
    User user;

    @BeforeEach
    void setUp() {
        userDto = new UserDto();
        userDto.setId(1L);
        userDto.setEmail("email@test.com");
        userDto.setLastName("Doe");
        userDto.setFirstName("John");
        userDto.setPassword("password");
        userDto.setAdmin(true);
        userDto.setCreatedAt(null);
        userDto.setUpdatedAt(null);

        user = User.builder()
                .id(1L)
                .email("email@test.com")
                .lastName("Doe")
                .firstName("John")
                .password("password")
                .admin(true)
                .createdAt(null)
                .updatedAt(null)
                .build();
    }

    @Test
    void toEntity() {
        UserMapperImpl userMapper = new UserMapperImpl();

        User mappedUser = userMapper.toEntity(userDto);

        assertEquals(user.getId(), mappedUser.getId());
        assertEquals(user.getEmail(), mappedUser.getEmail());
        assertEquals(user.getLastName(), mappedUser.getLastName());
        assertEquals(user.getFirstName(), mappedUser.getFirstName());
        assertEquals(user.getPassword(), mappedUser.getPassword());
        assertEquals(user.isAdmin(), mappedUser.isAdmin());
        assertEquals(user.getCreatedAt(), mappedUser.getCreatedAt());
        assertEquals(user.getUpdatedAt(), mappedUser.getUpdatedAt());
    }

    @Test
    void toEntityNull() {
        UserDto userDto = null;
        UserMapperImpl userMapper = new UserMapperImpl();
        assertNull(userMapper.toEntity(userDto));
    }

    @Test
    void toDto() {
        UserMapperImpl userMapper = new UserMapperImpl();

        UserDto mappedUserDto = userMapper.toDto(user);

        assertEquals(userDto.getId(), mappedUserDto.getId());
        assertEquals(userDto.getEmail(), mappedUserDto.getEmail());
        assertEquals(userDto.getLastName(), mappedUserDto.getLastName());
        assertEquals(userDto.getFirstName(), mappedUserDto.getFirstName());
        assertEquals(userDto.getPassword(), mappedUserDto.getPassword());
        assertEquals(userDto.isAdmin(), mappedUserDto.isAdmin());
        assertEquals(userDto.getCreatedAt(), mappedUserDto.getCreatedAt());
        assertEquals(userDto.getUpdatedAt(), mappedUserDto.getUpdatedAt());
    }

    @Test
    void toDtoNull() {
        User user = null;
        UserMapperImpl userMapper = new UserMapperImpl();
        assertNull(userMapper.toDto(user));
    }

    @Test
    void toEntityList() {
        List<UserDto> userDtoList = new ArrayList<>();
        userDtoList.add(userDto);
        userDtoList.add(userDto);
        userDtoList.add(userDto);
        List<User> userList = new ArrayList<>();
        userList.add(user);
        userList.add(user);
        userList.add(user);
        UserMapperImpl userMapper = new UserMapperImpl();
        List<User> mappedUserList = userMapper.toEntity(userDtoList);

        assertEquals(userList, mappedUserList);
    }

    @Test
    void toDtoList() {
        List<User> userList = new ArrayList<>();
        userList.add(user);
        userList.add(user);
        userList.add(user);
        List<UserDto> userDtoList = new ArrayList<>();
        userDtoList.add(userDto);
        userDtoList.add(userDto);
        userDtoList.add(userDto);
        UserMapperImpl userMapper = new UserMapperImpl();
        List<UserDto> mappedUserDtoList = userMapper.toDto(userList);

        assertEquals(userDtoList, mappedUserDtoList);
    }

    @Test
    void toEntityListNull() {
        List<UserDto> userDtoList = null;
        UserMapperImpl userMapper = new UserMapperImpl();
        assertNull(userMapper.toEntity(userDtoList));
    }

    @Test
    void toDtoListNull() {
        List<User> userList = null;
        UserMapperImpl userMapper = new UserMapperImpl();
        assertNull(userMapper.toDto(userList));
    }
}