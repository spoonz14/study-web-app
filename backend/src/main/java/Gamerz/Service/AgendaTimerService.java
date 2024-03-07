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
    private AgendaTimerRepository AgendaTimerRepository;


    public boolean registerTimerToUser(long UserID, AgendaTimer timer){

        return false;
    }

}
