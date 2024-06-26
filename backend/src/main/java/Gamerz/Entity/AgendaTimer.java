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

    private int year;
    private int month;
    private int day;

    private Long userId;
    private String dueDate;
    private String description;
    private int priorityLevel;
    private String category;

    private int numberedDay;
    private int numberedMonth;

//    public void setupTimer(long userID, int year, int month, int day){
//        dueDate = LocalDateTime.of(year, month, day, 0, 0).toString();
//    }
}
