package Gamerz.Service;

import Gamerz.Entity.StudyRoom;
import Gamerz.Repository.StudyRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudyRoomService {
    @Autowired
    private StudyRoomRepository studyRoomRepository;

    public boolean createStudyRoom(StudyRoom studyRoom) {
        // Check if the study room already exists
        StudyRoom existingStudyRoom = studyRoomRepository.findByStudyId(studyRoom.getStudy_room_id());
        if (existingStudyRoom != null) {
            return false; // Study room already exists
        }

        // Save the study room if it doesn't exist
        studyRoomRepository.save(studyRoom);
        return true;
    }

}
