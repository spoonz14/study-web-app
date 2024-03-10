package Gamerz.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import Gamerz.Entity.AgendaTimer;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendaTimerRepository extends JpaRepository<AgendaTimer, Long> {
    List<AgendaTimer> findByUserID(Long userID);
}