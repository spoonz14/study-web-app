package Gamerz.Configuration;

import Gamerz.Entity.ChatMessage;
import Gamerz.Entity.MessageType;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            System.out.println("User disconnected: " + username);
        } else {
            // If username is not available, use a generic label
            username = "Unknown User";
            System.out.println("User disconnected without username");
        }
        // Create a ChatMessage for the leave event
        ChatMessage chatMessage = ChatMessage.builder()
                .type(MessageType.LEAVE)
                .sender(username)
                .build();
        // Send the chat message to the "/topic/chat" destination
        messagingTemplate.convertAndSend("/topic/chat", chatMessage);
    }
}
