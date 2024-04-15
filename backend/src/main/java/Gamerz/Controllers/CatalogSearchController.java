package Gamerz.Controllers;

import Gamerz.Entity.StudyRoom;
import Gamerz.Service.CatalogSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CatalogSearchController {
    @Autowired
    private CatalogSearchService catalogSearchService;

    @GetMapping("/catalog/search")
    public ResponseEntity<List<StudyRoom>> searchCatalog(@RequestParam String query) {
        List<StudyRoom> searchResults = catalogSearchService.searchByQuery(query);
        return ResponseEntity.ok(searchResults);
    }
}
