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

    public boolean registerTimerToUser(int month, int day, int year){
        AgendaTimer newTimer = new AgendaTimer();
        newTimer.setupTimer(month, day, year);
        agendaTimerRepository.save(newTimer);
        return true;
    }
    public List<AgendaTimer> getAllTimers(){
    return agendaTimerRepository.getAllTimers();
    }
    public List<AgendaTimer> getAllTimersByUserID(long UserID){
        return agendaTimerRepository.getAllTimersByUserID(UserID);
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
}
