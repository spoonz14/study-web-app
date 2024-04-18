package Gamerz.Repository;

import Gamerz.Entity.AgendaTimer;
import Gamerz.Entity.Notes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendaTimerRepository extends JpaRepository<AgendaTimer, Long> {

    List<AgendaTimer> findByUserId(Long userId);
    List<AgendaTimer> findByUserIdAndNumberedDayAndNumberedMonth(Long userId, int numberedDay, int numberedMonth);

    List<AgendaTimer> findByUserIdAndNumberedMonth(Long userId, int numberedMonth);
}
