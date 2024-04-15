package Gamerz.Entity;

import jakarta.persistence.*;
import jdk.jfr.MemoryAddress;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class StudyRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "study_room_id_generator")
    @SequenceGenerator(name = "study_room_id_generator", sequenceName = "study_room_seq", allocationSize = 1)
    private Long studyRoomId;
    private Long chatId;
    private String roomName;
    private Long userId;
}
