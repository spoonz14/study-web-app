package Gamerz.Controllers;

import Gamerz.Entity.ChatMessage;
import Gamerz.Entity.MessageType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @PostMapping("/send-message")
    public void sendMessage(@RequestBody String messageContent) {
        // Assuming you have the sender information available, for example, as a logged-in user
        String sender = "Alice";

        // Create a ChatMessage using the builder pattern
        ChatMessage chatMessage = ChatMessage.builder()
                .content(messageContent)
                .sender(sender)
                .type(MessageType.CHAT)
                .build();

        // Further logic to send the message, for example, through WebSocket
    }
}
