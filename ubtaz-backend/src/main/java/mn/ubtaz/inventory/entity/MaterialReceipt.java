package mn.ubtaz.inventory.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "material_receipts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaterialReceipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id", nullable = false, unique = true)
    private InventoryTransaction transaction;

    @Column(length = 200)
    private String supplier;

    @Column(name = "invoice_no", length = 100)
    private String invoiceNo;
}
