package Gamerz.Service;

import Gamerz.Entity.AgendaTimer;
import Gamerz.Entity.User;
import Gamerz.Repository.AgendaTimerRepository;
import Gamerz.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public boolean deleteTimerToUser(long timerID){
        agendaTimerRepository.deleteById(timerID);
        return true;
    }
    public List<AgendaTimer> getAllTimers() {
        return agendaTimerRepository.findAll();
    }

    public List<AgendaTimer> getUserTimers(Long userId) {
        return agendaTimerRepository.findByUserId(userId);
    }

    public List<AgendaTimer> getUserTimersByDate(Long userId, int numberedDay, int numberedMonth) {
        return agendaTimerRepository.findByUserIdAndNumberedDayAndNumberedMonth(userId, numberedDay, numberedMonth);
    }

    public List<AgendaTimer> getUserTimersByUserAndMonth(Long userId,int numberedMonth) {
        return agendaTimerRepository.findByUserIdAndNumberedMonth(userId, numberedMonth);
    }

    public List<AgendaTimer> getUserTimersByCategory(Long userId, String categoryStr){
        List<AgendaTimer> list = new ArrayList<AgendaTimer>();
        for (AgendaTimer timer : agendaTimerRepository.findByUserId(userId)) {
            if (timer.getCategory().toLowerCase().contentEquals(categoryStr.toLowerCase())){
                list.add(timer);
            }
        }
        return list;
    }
    public List<String> getTimerCategories(Long userId){
        List<AgendaTimer> list = agendaTimerRepository.findByUserId(userId);
        List<String> returnLi = new ArrayList<String>();
        for (AgendaTimer timer : list){
            returnLi.add(timer.getCategory());
        }
        return returnLi;
    }

//    public List<AgendaTimer> getTimersByUserId(long userId) {
//
//        List<AgendaTimer> all = new ArrayList<AgendaTimer>();
//        List<AgendaTimer> filtered = new ArrayList<AgendaTimer>();
//        all = agendaTimerRepository.findAll();
//        for (AgendaTimer timer : all){
//            if (timer.getUserId() == userId){
//                filtered.add(timer);
//            }
//        }
//        return filtered;
//    }

    public boolean registerTimerToUser(AgendaTimer timer) {
        agendaTimerRepository.save(timer);
        return true;
    }

}