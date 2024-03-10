package Gamerz.Repository;

import Gamerz.Entity.StudyRoom;
import Gamerz.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {
    StudyRoom findByStudyId(Long Id);

}
