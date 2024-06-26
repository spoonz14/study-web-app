package Gamerz.Controllers;

import Gamerz.Configuration.JwtUtils;
import Gamerz.Entity.Login;
import Gamerz.Entity.User;
import Gamerz.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login login) {
        User authenticatedUser = loginService.login(login);
        if (authenticatedUser != null) {
            // Generate JWT token
            String token = JwtUtils.generateToken(
                    authenticatedUser.getId(),
                    authenticatedUser.getUsername(),
                    authenticatedUser.getRole()
            );

            // Send the token back to the client
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid username or password.");
        }
    }
}