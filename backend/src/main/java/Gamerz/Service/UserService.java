package Gamerz.Service;

import Gamerz.Entity.User;
import Gamerz.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository; // Creating an instance of the UserRepository object

    // Function to perform the registration is the username is not already taken
    public boolean registerUsers(User user) { // Boolean type to allow username validation
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return false; // User already exists, return false
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return false; // Email already exists
        }
        if (user.getRole() == null){
            user.setRole("user");
        }

        userRepository.save(user);
        return true; // Success
    }

    // Function that returns a list of all users
    public List<User> getAllUsers() {
        return userRepository.findAll(); // Using jpa repository function to retrieve all users
    }
}
