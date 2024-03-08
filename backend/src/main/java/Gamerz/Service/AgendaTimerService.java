package Gamerz.Service;

import Gamerz.Entity.AgendaTimer;
import Gamerz.Entity.User;
import Gamerz.Repository.AgendaTimerRepository;
import Gamerz.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendaTimerService {
    @Autowired
    private AgendaTimerRepository agendaTimerRepository;
    @Autowired
    private UserRepository userRepo;

    public boolean registerTimerToUser(User user, AgendaTimer timer) {
        if(user.getId() == null) {
            return false;
        }
        Long userId = user.getId();
        timer.setUserID(userId);
        agendaTimerRepository.save(timer);
        return true;
    }
}
