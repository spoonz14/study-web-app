package Gamerz.Controllers;

import Gamerz.Entity.StudyRoom;
import Gamerz.Service.CatalogService;
import Gamerz.Service.StudyRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CatalogController {
    @Autowired
    private StudyRoomService studyRoomService;
    @Autowired
    private CatalogService catalogService;

    @GetMapping("/catalog")
    public ResponseEntity<List<StudyRoom>> getAllRooms() {
        List<StudyRoom> studyRooms = studyRoomService.getAllRooms();
        return ResponseEntity.ok(studyRooms);
    }

    @PostMapping("/catalog")
    public ResponseEntity<String> create(@RequestBody StudyRoom studyRoom) {
        if (catalogService.createStudyRoom(studyRoom)) {
            return ResponseEntity.ok("Study room added.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Room already exists.");
        }
    }

    @GetMapping("/catalog/search/{query}")
    public ResponseEntity<List<StudyRoom>> searchCatalog(@PathVariable String query) {
        List<StudyRoom> searchResults = catalogService.searchByQuery(query);
        return ResponseEntity.ok(searchResults);
    }
}



