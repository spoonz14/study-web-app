package Gamerz.Controllers;

import Gamerz.Entity.Catalog;
import Gamerz.Service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @GetMapping("/catalogs")
    public ResponseEntity<List<Catalog>> getAllCatalogs() {
        return ResponseEntity.ok(catalogService.listAllCatalogs());
    }

}



