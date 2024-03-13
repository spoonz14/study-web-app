package Gamerz.Controllers;

import Gamerz.Entity.AgendaTimer;
import Gamerz.Entity.User;
import Gamerz.Service.AgendaTimerService;
import Gamerz.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService; // Creating an instance of the UserService object
    @Autowired
    private AgendaTimerService agendaTimerService;

    // PostMapping function to register users
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userService.registerUsers(user)) {
            return ResponseEntity.ok("Registration successful.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or email already exists.");
        }
    }

    @PostMapping("/registerTimer")
    public ResponseEntity<String> registerTimer(@RequestBody AgendaTimer timer) {
        if (agendaTimerService.registerTimerToUser(timer)) {
            return ResponseEntity.ok("Timer registration to user successful.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Timer registration to user failed");
        }
    }

    @DeleteMapping("/deleteTimer/{timerId}")
    public ResponseEntity<String> deleteTimer(@PathVariable int timerId) {
        if (agendaTimerService.deleteTimerToUser(timerId)) {
            return ResponseEntity.ok("Timer deleted");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Timer deletion failed");
        }
    }

    // GetMapping function to fetch all users in the database.
    // Not used in the application, mainly used for testing in postman
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/allTimers")
    public ResponseEntity<List<AgendaTimer>> getAllTimers() {
        List<AgendaTimer> timers = agendaTimerService.getAllTimers();
        return ResponseEntity.ok(timers);
    }
}
