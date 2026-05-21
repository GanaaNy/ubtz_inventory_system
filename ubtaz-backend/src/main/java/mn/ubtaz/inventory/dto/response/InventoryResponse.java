package mn.ubtaz.inventory.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Builder
public class InventoryResponse {

    private Long id;
    private String transactionType;
    private Long materialId;
    private String materialCode;
    private String materialName;
    private Long warehouseId;
    private String warehouseName;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private String referenceNo;
    private String notes;
    private String performedBy;
    private Instant transactionDate;
}
