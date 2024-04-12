package Gamerz.Service;

import Gamerz.Entity.User;
import Gamerz.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean registerUsers(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return false; // User already exists
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return false; // Email already exists
        }
        if (user.getRole() == null) {
            user.setRole("user");
        }
        userRepository.save(user);
        return true;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
