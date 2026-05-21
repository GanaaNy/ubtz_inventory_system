package mn.ubtaz.inventory.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mn.ubtaz.inventory.dto.request.LoginRequest;
import mn.ubtaz.inventory.dto.response.AuthResponse;
import mn.ubtaz.inventory.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
