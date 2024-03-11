package Gamerz.Repository;

import Gamerz.Entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogRepository extends JpaRepository<StudyRoom, Long> {

}



