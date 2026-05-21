package mn.ubtaz.inventory.service;

import lombok.RequiredArgsConstructor;
import mn.ubtaz.inventory.dto.request.MaterialRequest;
import mn.ubtaz.inventory.dto.response.MaterialResponse;
import mn.ubtaz.inventory.entity.Material;
import mn.ubtaz.inventory.exception.ResourceNotFoundException;
import mn.ubtaz.inventory.repository.InventoryTransactionRepository;
import mn.ubtaz.inventory.repository.MaterialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialService {

    private final MaterialRepository materialRepository;
    private final InventoryTransactionRepository transactionRepository;

    @Transactional(readOnly = true)
    public List<MaterialResponse> findAll() {
        return materialRepository.findByActiveTrue().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public MaterialResponse findById(Long id) {
        return toResponse(getMaterial(id));
    }

    @Transactional
    public MaterialResponse create(MaterialRequest request) {
        if (materialRepository.existsByCode(request.getCode())) {
            throw new IllegalArgumentException("Материалын код давхардаж байна: " + request.getCode());
        }

        Material material = Material.builder()
                .code(request.getCode())
                .name(request.getName())
                .unit(request.getUnit())
                .category(request.getCategory())
                .minStock(request.getMinStock())
                .description(request.getDescription())
                .active(request.getActive() != null && request.getActive())
                .build();

        return toResponse(materialRepository.save(material));
    }

    @Transactional
    public MaterialResponse update(Long id, MaterialRequest request) {
        Material material = getMaterial(id);
        material.setName(request.getName());
        material.setUnit(request.getUnit());
        material.setCategory(request.getCategory());
        material.setMinStock(request.getMinStock());
        material.setDescription(request.getDescription());
        if (request.getActive() != null) {
            material.setActive(request.getActive());
        }
        return toResponse(materialRepository.save(material));
    }

    @Transactional
    public void delete(Long id) {
        Material material = getMaterial(id);
        material.setActive(false);
        materialRepository.save(material);
    }

    private Material getMaterial(Long id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Материал олдсонгүй: " + id));
    }

    private MaterialResponse toResponse(Material material) {
        BigDecimal stock = transactionRepository.calculateStockForMaterial(material.getId());
        if (stock == null) {
            stock = BigDecimal.ZERO;
        }

        return MaterialResponse.builder()
                .id(material.getId())
                .code(material.getCode())
                .name(material.getName())
                .unit(material.getUnit())
                .category(material.getCategory())
                .minStock(material.getMinStock())
                .currentStock(stock)
                .description(material.getDescription())
                .active(material.isActive())
                .createdAt(material.getCreatedAt())
                .build();
    }
}
