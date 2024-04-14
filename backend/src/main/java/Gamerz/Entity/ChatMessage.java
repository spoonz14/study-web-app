package Gamerz.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue
    private Long id;

    private String content;
    private String sender;
    private MessageType type;

    private Long userId; // Add this property

    // Constructors
    public ChatMessage(String content, String sender, MessageType type) {
        this.content = content;
        this.sender = sender;
        this.type = type;
    }
}

