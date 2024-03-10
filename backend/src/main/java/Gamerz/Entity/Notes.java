package Gamerz.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Notes {
    @Id
    @GeneratedValue
    private Long note_id;

    private String title;
    private String description;
    
}
