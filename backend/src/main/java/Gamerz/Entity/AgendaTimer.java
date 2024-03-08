package Gamerz.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class AgendaTimer {
    @Id
    @GeneratedValue
    private Long timerID;

    private Long userID; //Foreign key
    private LocalDateTime dueDate;
    private String description;
    private int priorityLevel;
    private String category;
}
