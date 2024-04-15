package Gamerz.Service;

import Gamerz.Entity.StudyRoom;
import Gamerz.Repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CatalogSearchService {
    private final CatalogRepository catalogRepository;

    @Autowired
    public CatalogSearchService(CatalogRepository catalogRepository) {
        this.catalogRepository = catalogRepository;
    }

    public List<StudyRoom> searchByQuery(String query) {
        // Call the search method you added in the CatalogRepository
        return catalogRepository.findByRoomNameContainingIgnoreCase(query);
    }
}
