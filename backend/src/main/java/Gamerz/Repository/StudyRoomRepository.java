package Gamerz.Repository;

import Gamerz.Entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {
    StudyRoom findByRoomName(String roomName);

    Optional<StudyRoom> findByStudyRoomId(Long studyRoomId);
}
