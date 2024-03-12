package Gamerz.Controllers;

import Gamerz.Entity.Notes;
import Gamerz.Entity.User;
import Gamerz.Service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping("/notes")
    public ResponseEntity<String> add(@RequestBody Notes notes) {
        if (notesService.addNote(notes)) {
            return ResponseEntity.ok("Note added.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Title already exists.");
        }
    }

    @GetMapping("/notes")
    public ResponseEntity<List<Notes>> getAllNotes() {
        List<Notes> notes = notesService.getAllNotes();
        return ResponseEntity.ok(notes);
    }
}
