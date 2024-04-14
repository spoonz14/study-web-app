package Gamerz.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import Gamerz.Entity.ChatMessage;
import java.util.List;

public interface MessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByUserId(Long userId);
}
