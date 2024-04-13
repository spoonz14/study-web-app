package Gamerz.Entity;

public class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;

    private ChatMessage() {
    }

    public static Builder builder() {
        return new Builder();
    }

    // Getters and setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    // Builder class
    public static class Builder {
        private final ChatMessage chatMessage;

        private Builder() {
            chatMessage = new ChatMessage();
        }

        public Builder content(String content) {
            chatMessage.setContent(content);
            return this;
        }

        public Builder sender(String sender) {
            chatMessage.setSender(sender);
            return this;
        }

        public Builder type(MessageType type) {
            chatMessage.setType(type);
            return this;
        }

        public ChatMessage build() {
            return chatMessage;
        }
    }
}
