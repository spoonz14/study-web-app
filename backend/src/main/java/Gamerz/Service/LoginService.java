package Gamerz.Service;

import Gamerz.Entity.Login;
import Gamerz.Entity.User;
import Gamerz.Repository.LoginRepository;
import Gamerz.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    LoginRepository loginRepository;
    @Autowired
    UserRepository userRepository;

    public boolean login(Login login) {
        if (userRepository.findByUsername(login.getUsername()) != null && userRepository.findByPassword(login.getPassword()) != null) {
            return true;
        }
        return false;
    }
}
