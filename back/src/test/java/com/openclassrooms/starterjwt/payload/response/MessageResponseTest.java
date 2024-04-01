package com.openclassrooms.starterjwt.payload.response;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class MessageResponseTest {

    @Test
    void testGetMessage() {
        String message = "Hello World!";
        MessageResponse response = new MessageResponse(message);
        assertEquals(message, response.getMessage());
    }

    @Test
    void testSetMessage() {
        String message = "Hello World!";
        MessageResponse response = new MessageResponse("");
        response.setMessage(message);
        assertEquals(message, response.getMessage());
    }
}