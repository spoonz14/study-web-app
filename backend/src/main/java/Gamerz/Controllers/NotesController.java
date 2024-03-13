package Gamerz.Controllers;

import Gamerz.Entity.Notes;
import Gamerz.Entity.User;
import Gamerz.Repository.NotesRepository;
import Gamerz.Service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotesController {

    @Autowired
    private NotesService notesService;

    @Autowired
    NotesRepository notesRepository;

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

    @PutMapping("/notes/{id}")
    public ResponseEntity<String> updateNote(@PathVariable Long id, @RequestBody Notes updatedNote) {
        Notes existingNote = notesService.findNoteById(id);
        if (existingNote == null) {
            return ResponseEntity.notFound().build();
        }

        // Update existing note
        existingNote.setTitle(updatedNote.getTitle());
        existingNote.setDescription(updatedNote.getDescription());

        // Save the changes
        notesRepository.save(existingNote);

        return ResponseEntity.ok("Note updated.");
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id) {
        if (notesService.deleteNotes(id)) {
            return ResponseEntity.ok("Note deleted.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Note deletion failed");
        }
    }
}
