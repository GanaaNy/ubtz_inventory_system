package mn.ubtaz.inventory.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mn.ubtaz.inventory.dto.request.InventoryTransactionRequest;
import mn.ubtaz.inventory.dto.response.InventoryResponse;
import mn.ubtaz.inventory.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<InventoryResponse>> findAll() {
        return ResponseEntity.ok(inventoryService.findAll());
    }

    @GetMapping("/material/{materialId}")
    public ResponseEntity<List<InventoryResponse>> findByMaterial(@PathVariable Long materialId) {
        return ResponseEntity.ok(inventoryService.findByMaterial(materialId));
    }

    @PostMapping("/transactions")
    public ResponseEntity<InventoryResponse> createTransaction(
            @Valid @RequestBody InventoryTransactionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.createTransaction(request));
    }
}
