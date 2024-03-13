package Gamerz.Repository;

import Gamerz.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Extending the JPARepository class to access its pre-built methods
public interface UserRepository extends JpaRepository<User, Long> {

    // Will be used to validate usernames and prevent repeat entries
    User findByUsername(String username);

    // Will be used to validate emails and prevent repeat entries
    User findByEmail(String email);
}
