package Gamerz.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;


import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue
    private Long id; // Auto-incremented Primary Key

    @NotBlank(message = "Username is required.")
    private String username;
    @NotBlank(message = "Password is required.")
    private String password;

    private String role;
    @NotBlank(message = "First Name is required.")
    private String firstName;
    @NotBlank(message = "Last Name is required.")
    private String lastName;
    @NotBlank(message = "Email is required.")
    private String email;

    public void setPassword(String password) {
        this.password = BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
