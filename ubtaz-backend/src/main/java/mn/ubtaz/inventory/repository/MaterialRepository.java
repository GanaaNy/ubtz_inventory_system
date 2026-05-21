package mn.ubtaz.inventory.repository;

import mn.ubtaz.inventory.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    Optional<Material> findByCode(String code);

    List<Material> findByActiveTrue();

    boolean existsByCode(String code);
}
