package Gamerz.Repository;

import Gamerz.Entity.AgendaTimer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendaTimerRepository extends JpaRepository<AgendaTimer, Long> {

    List<AgendaTimer> findTimersByUSer(String username);
}
