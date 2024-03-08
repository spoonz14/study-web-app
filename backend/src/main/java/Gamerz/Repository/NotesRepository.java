package Gamerz.Repository;

import Gamerz.Entity.Notes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Savepoint;

public interface NotesRepository extends JpaRepository<Notes, Long> {

    Notes findByTitle(String title);
    Notes findByDescription(String description);


}
