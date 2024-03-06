package Gamerz.studywebapp.Controller;

import Gamerz.studywebapp.Entity.User;
import Gamerz.studywebapp.Service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userService.registerUsers(user)) {
            return ResponseEntity.ok("Registration successful.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or email alread exists.");
        }
    }
}
