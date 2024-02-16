package com.example.web.services;


import com.example.web.model.Students;
import com.example.web.model.SuperUsers;
import com.example.web.repository.SuperUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SuperUserDetailsService implements UserDetailsService {
    private final SuperUserRepository superUserRepository;

    public SuperUserDetailsService(SuperUserRepository superUserRepository) {
        this.superUserRepository = superUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        SuperUsers superUser = superUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("SuperUser not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(superUser.getEmail())
                .password(superUser.getPassword())
                .roles("ADMIN")
                .build();

    }

    public long getTotalAdministrators() {
        return superUserRepository.count();
    }
}
