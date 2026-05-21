package mn.ubtaz.inventory.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Builder
public class MaterialResponse {

    private Long id;
    private String code;
    private String name;
    private String unit;
    private String category;
    private BigDecimal minStock;
    private BigDecimal currentStock;
    private String description;
    private boolean active;
    private Instant createdAt;
}
