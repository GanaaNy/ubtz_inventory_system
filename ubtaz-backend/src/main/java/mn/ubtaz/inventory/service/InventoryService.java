package mn.ubtaz.inventory.service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import mn.ubtaz.inventory.dto.request.InventoryTransactionRequest;
import mn.ubtaz.inventory.dto.response.InventoryResponse;
import mn.ubtaz.inventory.entity.*;
import mn.ubtaz.inventory.exception.ResourceNotFoundException;
import mn.ubtaz.inventory.repository.InventoryTransactionRepository;
import mn.ubtaz.inventory.repository.MaterialRepository;
import mn.ubtaz.inventory.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryTransactionRepository transactionRepository;
    private final MaterialRepository materialRepository;
    private final UserRepository userRepository;
    private final EntityManager entityManager;

    @Transactional(readOnly = true)
    public List<InventoryResponse> findAll() {
        return transactionRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<InventoryResponse> findByMaterial(Long materialId) {
        return transactionRepository.findByMaterialIdOrderByTransactionDateDesc(materialId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public InventoryResponse createTransaction(InventoryTransactionRequest request) {
        Material material = materialRepository.findById(request.getMaterialId())
                .orElseThrow(() -> new ResourceNotFoundException("Материал олдсонгүй"));
        Warehouse warehouse = entityManager.find(Warehouse.class, request.getWarehouseId());
        if (warehouse == null) {
            throw new ResourceNotFoundException("Агуулах олдсонгүй");
        }

        User performer = resolveCurrentUser();

        InventoryTransaction transaction = InventoryTransaction.builder()
                .transactionType(request.getTransactionType().toUpperCase())
                .material(material)
                .warehouse(warehouse)
                .quantity(request.getQuantity())
                .unitPrice(request.getUnitPrice())
                .referenceNo(request.getReferenceNo())
                .notes(request.getNotes())
                .performedBy(performer)
                .build();

        transaction = transactionRepository.save(transaction);

        if ("RECEIPT".equalsIgnoreCase(request.getTransactionType())) {
            MaterialReceipt receipt = MaterialReceipt.builder()
                    .transaction(transaction)
                    .supplier(request.getSupplier())
                    .invoiceNo(request.getInvoiceNo())
                    .build();
            entityManager.persist(receipt);
        } else if ("ISSUE".equalsIgnoreCase(request.getTransactionType())) {
            Section section = request.getSectionId() != null
                    ? entityManager.find(Section.class, request.getSectionId())
                    : null;
            MaterialIssue issue = MaterialIssue.builder()
                    .transaction(transaction)
                    .section(section)
                    .issuedTo(request.getIssuedTo())
                    .build();
            entityManager.persist(issue);
        }

        return toResponse(transaction);
    }

    private User resolveCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElse(null);
    }

    private InventoryResponse toResponse(InventoryTransaction t) {
        String performedBy = t.getPerformedBy() != null ? t.getPerformedBy().getFullName() : null;
        return InventoryResponse.builder()
                .id(t.getId())
                .transactionType(t.getTransactionType())
                .materialId(t.getMaterial().getId())
                .materialCode(t.getMaterial().getCode())
                .materialName(t.getMaterial().getName())
                .warehouseId(t.getWarehouse().getId())
                .warehouseName(t.getWarehouse().getName())
                .quantity(t.getQuantity())
                .unitPrice(t.getUnitPrice())
                .referenceNo(t.getReferenceNo())
                .notes(t.getNotes())
                .performedBy(performedBy)
                .transactionDate(t.getTransactionDate())
                .build();
    }
}
