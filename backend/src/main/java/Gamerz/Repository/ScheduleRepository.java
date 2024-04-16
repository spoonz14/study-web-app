package Gamerz.Repository;

import Gamerz.Entity.Notes;
import Gamerz.Entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    Schedule findByTitle(String title);
}
