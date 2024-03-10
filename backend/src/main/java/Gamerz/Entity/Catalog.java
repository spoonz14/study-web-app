package Gamerz.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jdk.jfr.Enabled;
import lombok.Data;

@Enabled
@Data
public class Catalog {
    @Id
    @GeneratedValue
    private Long catalog_id;

    private String room_name;

}
