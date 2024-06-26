package Gamerz.Repository;

import Gamerz.Entity.Notes;
import Gamerz.Entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Savepoint;
import java.util.List;
import java.util.Optional;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {

    //Method that finds notes by their title
    Notes findByTitleAndUserId(String title, Long userId);

    List<Notes> findByUserId(Long userId);

    //Method to find notes by description
    Notes findByDescription(String description);


//    Optional<Notes> findNoteById(Long noteId);
}
