package mn.ubtaz.inventory.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class DashboardStatsResponse {

    private long totalMaterials;
    private long lowStockCount;
    private long receiptsToday;
    private long issuesToday;
    private BigDecimal totalStockValue;
    private List<MaterialResponse> lowStockMaterials;
}
