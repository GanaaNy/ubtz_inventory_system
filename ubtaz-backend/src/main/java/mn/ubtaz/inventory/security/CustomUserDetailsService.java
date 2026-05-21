package mn.ubtaz.inventory.security;

import lombok.RequiredArgsConstructor;
import mn.ubtaz.inventory.entity.User;
import mn.ubtaz.inventory.exception.ResourceNotFoundException;
import mn.ubtaz.inventory.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Хэрэглэгч олдсонгүй: " + username));

        if (!user.isActive()) {
            throw new UsernameNotFoundException("Хэрэглэгч идэвхгүй байна");
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName()))
        );
    }
}
