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
@CrossOrigin(origins = "http://localhost:3000")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @Autowired
    NotesRepository notesRepository;

    // Endpoint to add a new note
    @PostMapping("/notes")
    public ResponseEntity<String> add(@RequestBody Notes notes) {
        if (notesService.addNote(notes)) {
            return ResponseEntity.ok("Note added.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Title already exists.");
        }
    }

    // Endpoint to retrieve all notes
    @GetMapping("/notes/{userId}")
    public ResponseEntity<List<Notes>> getAllNotes(@PathVariable Long userId) {
        List<Notes> notes = notesService.getAllNotesByUserId(userId);
        return ResponseEntity.ok(notes);
    }

    // Endpoint to update a note by ID
    @PutMapping("/notes/{userId}/{id}")
    public ResponseEntity<String> updateNote(@PathVariable Long id, Long userId, @RequestBody Notes updatedNote) {
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

    // Endpoint to delete a note by ID
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id) {
        if (notesService.deleteNotes(id)) {
            return ResponseEntity.ok("Note deleted.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Note deletion failed");
        }
    }
}
