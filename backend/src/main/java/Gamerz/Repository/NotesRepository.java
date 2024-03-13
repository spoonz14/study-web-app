package Gamerz.Repository;

import Gamerz.Entity.Notes;
import Gamerz.Entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Savepoint;
import java.util.Optional;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {

    Notes findByTitle(String title);
    Notes findByDescription(String description);

//    Optional<Notes> findNoteById(Long noteId);
}
