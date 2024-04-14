package Gamerz.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue
    private Long id; // Auto-incremented Primary Key

    private String username;
    private String password;
    private String role;
    private String firstName;
    private String lastName;
    private String email;
}
