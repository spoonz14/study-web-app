package Gamerz.Controllers;

import Gamerz.Entity.Notes;
import Gamerz.Service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class NotesController {
    @Autowired
    private NotesService notesService;

    @PostMapping("/Add")
    public ResponseEntity<String> add(@RequestBody Notes notes) {
        if (notesService.addNote(notes)) {
            return ResponseEntity.ok("Note added.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Title already exists");
        }

    }
}
