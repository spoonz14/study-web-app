package Gamerz.Service;

import Gamerz.Entity.StudyRoom;
import Gamerz.Repository.StudyRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudyRoomService {
    @Autowired
    private StudyRoomRepository studyRoomRepository;

    public boolean createStudyRoom(StudyRoom studyRoom) {
        if (studyRoomRepository.findByRoomName(studyRoom.getRoomName()) != null) {
            return false; // Study room already exists
        }

        // Save the new study room if it doesn't exist
        studyRoomRepository.save(studyRoom);
        return true;
    }

    public List<StudyRoom> getAllRooms() {
        return studyRoomRepository.findAll();
    }

    public StudyRoom findByStudyRoomId (Long id) {
       Optional<StudyRoom> optionalStudyRoom = studyRoomRepository.findByStudyRoomId(id);
       return optionalStudyRoom.orElse(null);
    }
}
