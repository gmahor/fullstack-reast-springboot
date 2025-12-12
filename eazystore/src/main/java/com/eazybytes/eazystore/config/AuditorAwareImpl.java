package com.eazybytes.eazystore.config;

import com.eazybytes.eazystore.entity.Customer;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("auditorAwareImpl")
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return Optional.of("Anonymous user");
        }
        Object principal = authentication.getPrincipal();
        String username;

        if (principal instanceof Customer customer) {
            username = customer.getEmail();
        } else {
            username = principal.toString(); // fallback
        }

        return Optional.of(username);
    }
}
