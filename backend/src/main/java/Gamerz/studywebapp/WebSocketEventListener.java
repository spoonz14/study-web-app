package Gamerz.studywebapp;


import Gamerz.studywebapp.chat.ChatMessage;
import Gamerz.studywebapp.chat.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Session;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

private final SimpMessageSendingOperations messageTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(
            SessionDisconnectEvent event
    ) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            log.info("User Disconnected : {}", username);
            var chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVE)
                    .build();
            messageTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }

}