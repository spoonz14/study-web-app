package Gamerz.Repository;

import Gamerz.Entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CatalogRepository extends JpaRepository<StudyRoom, Long> {

    List<StudyRoom> findByRoomNameContainingIgnoreCase(String roomName);

}



