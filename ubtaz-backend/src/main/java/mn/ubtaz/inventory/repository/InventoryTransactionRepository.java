package mn.ubtaz.inventory.repository;

import mn.ubtaz.inventory.entity.InventoryTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {

    List<InventoryTransaction> findByMaterialIdOrderByTransactionDateDesc(Long materialId);

    List<InventoryTransaction> findByTransactionDateBetween(Instant from, Instant to);

    @Query("""
            SELECT COALESCE(SUM(
                CASE WHEN t.transactionType = 'RECEIPT' THEN t.quantity
                     WHEN t.transactionType = 'ISSUE' THEN -t.quantity
                     ELSE 0 END), 0)
            FROM InventoryTransaction t
            WHERE t.material.id = :materialId
            """)
    BigDecimal calculateStockForMaterial(Long materialId);
}
