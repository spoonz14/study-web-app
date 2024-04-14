package Gamerz.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Notes {
    // Primary key for the Notes entity
    @Id
    @GeneratedValue
    private Long noteId;
    // Title of the note
    private String title;
    // Description or content of the note
    private String description;

    private Long userId;

}
