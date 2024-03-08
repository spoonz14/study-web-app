package Gamerz.Entity;

import jakarta.persistence.*;
import jdk.jfr.MemoryAddress;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class StudyRoom {
    @Id
    @GeneratedValue
    private Long study_room_id;

    private String roomName;


}
