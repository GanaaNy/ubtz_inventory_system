package mn.ubtaz.inventory.service;

import lombok.RequiredArgsConstructor;
import mn.ubtaz.inventory.dto.response.DashboardStatsResponse;
import mn.ubtaz.inventory.dto.response.MaterialResponse;
import mn.ubtaz.inventory.entity.Material;
import mn.ubtaz.inventory.entity.Report;
import mn.ubtaz.inventory.repository.InventoryTransactionRepository;
import mn.ubtaz.inventory.repository.MaterialRepository;
import mn.ubtaz.inventory.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final MaterialRepository materialRepository;
    private final InventoryTransactionRepository transactionRepository;
    private final MaterialService materialService;
    private final UserRepository userRepository;
    private final EntityManager entityManager;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        List<MaterialResponse> materials = materialService.findAll();
        List<MaterialResponse> lowStock = materials.stream()
                .filter(m -> m.getMinStock() != null && m.getCurrentStock() != null
                        && m.getCurrentStock().compareTo(m.getMinStock()) < 0)
                .toList();

        Instant startOfDay = LocalDate.now().atStartOfDay().toInstant(ZoneOffset.UTC);
        Instant endOfDay = LocalDate.now().plusDays(1).atStartOfDay().toInstant(ZoneOffset.UTC);

        long receiptsToday = transactionRepository.findByTransactionDateBetween(startOfDay, endOfDay).stream()
                .filter(t -> "RECEIPT".equals(t.getTransactionType()))
                .count();
        long issuesToday = transactionRepository.findByTransactionDateBetween(startOfDay, endOfDay).stream()
                .filter(t -> "ISSUE".equals(t.getTransactionType()))
                .count();

        BigDecimal totalValue = materials.stream()
                .map(m -> m.getCurrentStock() != null ? m.getCurrentStock() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return DashboardStatsResponse.builder()
                .totalMaterials(materials.size())
                .lowStockCount(lowStock.size())
                .receiptsToday(receiptsToday)
                .issuesToday(issuesToday)
                .totalStockValue(totalValue)
                .lowStockMaterials(lowStock)
                .build();
    }

    @Transactional
    public Report generateReport(String reportType, String title, Map<String, Object> parameters) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Report report = Report.builder()
                .reportType(reportType)
                .title(title)
                .generatedBy(userRepository.findByUsername(username).orElse(null))
                .parameters(parameters != null ? parameters : new HashMap<>())
                .build();

        return entityManager.merge(report);
    }

    @Transactional(readOnly = true)
    public List<Material> getLowStockMaterials() {
        return materialRepository.findByActiveTrue();
    }
}
