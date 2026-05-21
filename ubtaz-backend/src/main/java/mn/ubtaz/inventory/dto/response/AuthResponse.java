package mn.ubtaz.inventory.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {

    private String token;
    private String tokenType;
    private Long userId;
    private String username;
    private String fullName;
    private String role;
}
