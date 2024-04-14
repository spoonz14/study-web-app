package Gamerz.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Gamerz.Entity.ChatMessage;
import Gamerz.Service.MessageService;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    private final MessageService messageService;

    @Autowired
    public ChatController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<?> saveMessage(@RequestBody ChatMessage chatMessage) {
        try {
            messageService.saveMessage(chatMessage);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving message: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ChatMessage>> getMessagesByUserId(@PathVariable Long userId) {
        try {
            List<ChatMessage> messages = messageService.getMessagesByUserId(userId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
