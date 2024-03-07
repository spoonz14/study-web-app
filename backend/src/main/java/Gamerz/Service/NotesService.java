package Gamerz.Service;

import Gamerz.Entity.Notes;
import Gamerz.Repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
