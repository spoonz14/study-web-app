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
    private Long userID;
    private LocalDateTime dueDate;
    private String desc;
    private int priorityLevel;
    private String category;
    public void setupTimer(int year, int month, int day){
        dueDate = LocalDateTime.of(year, month, day, 0, 0);
    }
}
