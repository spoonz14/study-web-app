package Gamerz.Service;

import Gamerz.Entity.Notes;
import Gamerz.Repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class NotesService {
    @Autowired
    private NotesRepository notesRepository;

    public boolean addNote(Notes notes) {
        if (notesRepository.findByTitle(notes.getTitle()) != null) {
            return false;
        }
        notesRepository.save(notes);
        return true;
    }

    public List<Notes> getAllNotes() {
        return notesRepository.findAll();
    }

    public Notes findNoteById(Long id) {
        Optional<Notes> optionalNote = notesRepository.findById(id);
        return (Notes) optionalNote.orElse(null);
    }

    public boolean deleteNotes(long noteId){
        notesRepository.deleteById(noteId);
        return true;
    }
}
