package Gamerz.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Gamerz.Entity.ChatMessage;
import Gamerz.Repository.MessageRepository;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void saveMessage(ChatMessage chatMessage) {
        messageRepository.save(chatMessage);
    }

    public List<ChatMessage> getMessagesByUserId(Long userId) {
        return messageRepository.findByUserId(userId);
    }
    public List<ChatMessage> getMessagesByStudyRoomId(Long studyRoomId) {
        return messageRepository.findByStudyRoomId(studyRoomId);
    }
}
