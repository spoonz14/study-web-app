package Gamerz.Service;

import Gamerz.Entity.Catalog;
import Gamerz.Repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogService {

    @Autowired
    private CatalogRepository catalogRepository;

    public List<Catalog> listAllCatalogs() {
        return catalogRepository.findAll();
    }

}



