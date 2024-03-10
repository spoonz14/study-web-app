package Gamerz.Controllers;

import Gamerz.Entity.StudyRoom;
import Gamerz.Service.StudyRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudyRoomController {

    @Autowired
    private StudyRoomService studyRoomService;

    @PostMapping("/create")
    public ResponseEntity<String> add(@RequestBody StudyRoom studyRoom) {
        if (studyRoomService.createStudyRoom(studyRoom)) {
            return ResponseEntity.ok("Study room added.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Room already exists.");
        }
    }
}
