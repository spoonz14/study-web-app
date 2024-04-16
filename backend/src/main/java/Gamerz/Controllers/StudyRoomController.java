package Gamerz.Controllers;

import Gamerz.Entity.StudyRoom;
import Gamerz.Service.StudyRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StudyRoomController {

    @Autowired
    private StudyRoomService studyRoomService;

    @GetMapping("/room/{id}")
    public ResponseEntity<StudyRoom> findByStudyRoomId(@PathVariable Long id) {
        StudyRoom studyRoom = studyRoomService.findByStudyRoomId(id);
        if (studyRoom != null) {
            return ResponseEntity.ok(studyRoom);

        } else {
            return ResponseEntity.notFound().build();

        }
    }

    @DeleteMapping("/room/{id}")
    public ResponseEntity<String> deleteStudyRoom(@PathVariable Long id) {
        boolean isDeleted = studyRoomService.deleteStudyRoom(id);
        if (isDeleted) {
            return ResponseEntity.ok("Study Room deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Study Room not found.");
        }
    }
}

