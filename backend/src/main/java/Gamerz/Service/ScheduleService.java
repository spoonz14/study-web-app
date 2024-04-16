package Gamerz.Service;

import Gamerz.Entity.Notes;
import Gamerz.Entity.Schedule;
import Gamerz.Entity.StudyRoom;
import Gamerz.Repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;


    public boolean addScheduling(Schedule schedule) {
        if (scheduleRepository.findByTitle(schedule.getTitle()) != null) {
            return false; // Schedule room already exists
        }

        // Save the new study room if it doesn't exist
        scheduleRepository.save(schedule);
        return true;
    }

    public List<Schedule> getAllScheduling() {
        return scheduleRepository.findAll();
    }
}
