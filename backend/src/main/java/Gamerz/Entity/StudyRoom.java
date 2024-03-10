package Gamerz.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jdk.jfr.MemoryAddress;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class StudyRoom {
    @Id
    @GeneratedValue
    private Long study_room_id;

    private String study_room_name;

    private List<User> userList;
}
