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

    public boolean registerTimerToUser(long userID, int year, int month, int day) {
        boolean success = false;
        AgendaTimer newTimer = new AgendaTimer();
        newTimer.setupTimer(userID, year, month, day);
        agendaTimerRepository.save(newTimer);
        success = true;
        return success;
    }
    /*
    public boolean registerTimerToUser(User user, AgendaTimer timer) {
        agendaTimerRepository.save(timer);

        if(user.getId() == null) {
            return false;
        }
        Long userId = user.getId();
        timer.setUserID(userId);
        agendaTimerRepository.save(timer);

        return true;
    }
    */

    public boolean registerTimerToUser(AgendaTimer timer) {
        agendaTimerRepository.save(timer);
        return true;
    }

}
