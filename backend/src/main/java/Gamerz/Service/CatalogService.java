package Gamerz.Service;

import Gamerz.Entity.StudyRoom;
import Gamerz.Repository.CatalogRepository;
import Gamerz.Repository.StudyRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CatalogService {

    @Autowired
    private StudyRoomRepository studyRoomRepository;


    public List<String> getRoomNames() {
        List<String> roomNames = new ArrayList<>();
        List<StudyRoom> studyRooms = studyRoomRepository.findAll();

        for (StudyRoom studyRoom : studyRooms) {
            roomNames.add(studyRoom.getRoomName());
        }

        return roomNames;
    }

}
