package Gamerz.Service;

import Gamerz.Entity.Login;
import Gamerz.Entity.User;
import Gamerz.Repository.LoginRepository;
import Gamerz.Repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private UserRepository userRepository;

    public User login(Login login) {
        String username = login.getUsername();
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword() != null) {
            String inputPassword = login.getPassword();
            String hashedPassword = user.getPassword();

            boolean authenticatePassword = BCrypt.checkpw(inputPassword, hashedPassword);
            if (authenticatePassword) {
                System.out.println("Password authentication successful for user: " + username);
                return user;
            } else {
                System.out.println("Password authentication failed for user: " + username);
            }
        } else {
            System.out.println("User not found or password is null for username: " + username);
        }
        return null;
    }

}
