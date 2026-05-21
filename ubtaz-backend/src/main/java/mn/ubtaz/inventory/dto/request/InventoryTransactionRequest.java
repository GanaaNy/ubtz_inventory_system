package mn.ubtaz.inventory.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class InventoryTransactionRequest {

    @NotBlank
    private String transactionType;

    @NotNull
    private Long materialId;

    @NotNull
    private Long warehouseId;

    @NotNull
    @Positive
    private BigDecimal quantity;

    private BigDecimal unitPrice;

    private String referenceNo;

    private String notes;

    private String supplier;

    private String invoiceNo;

    private Long sectionId;

    private String issuedTo;
}
