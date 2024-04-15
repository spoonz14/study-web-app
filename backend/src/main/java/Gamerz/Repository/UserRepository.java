package Gamerz.Repository;

import Gamerz.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    User findByPassword(String password);
    User findByEmail(String email);
}
