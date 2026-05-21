package mn.ubtaz.inventory.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class MaterialRequest {

    @NotBlank
    private String code;

    @NotBlank
    private String name;

    @NotBlank
    private String unit;

    private String category;

    private BigDecimal minStock;

    private String description;

    @NotNull
    private Boolean active = true;
}
