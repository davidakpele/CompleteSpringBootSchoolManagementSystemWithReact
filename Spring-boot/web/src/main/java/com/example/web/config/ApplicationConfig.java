package com.example.web.config;

import com.example.web.repository.ProfessorRepository;
import com.example.web.repository.StudentRepository;
import com.example.web.repository.SuperUserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final StudentRepository studentRepository;
    private final SuperUserRepository superUserRepository;
    private final ProfessorRepository professorRepository;


    private final Logger logger = LoggerFactory.getLogger(ApplicationConfig.class);
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            if (isEmailFormat(username)) {
                return superUserRepository.findByEmail(username)
                        .orElseThrow(() -> {
                            logger.error("User not found for email: {}", username);
                            return new UsernameNotFoundException("User not found");
                        });
            } else if (startsWithUD48(username)) {
                return studentRepository.findByMatricNumber(username)
                        .orElseThrow(() -> {
                            logger.error("User not found for matric number: {}", username);
                            return new UsernameNotFoundException("User not found");
                        });
            } else if (startWithAccessCode(username)){
                return professorRepository.findByAccessCode(username)
                        .orElseThrow(() -> {
                            logger.error("User not found for Access Code: {}", username);
                            return new UsernameNotFoundException("User not found");
                        });
            }else {
                logger.warn("Username does not match expected formats.");
                throw new UsernameNotFoundException("Invalid username format");
            }
        };
    }

    @Bean
    public UserDetailsService adminDetailsService(){
        return username -> superUserRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();

    }

    private boolean isEmailFormat(String username) {
        // Simple email format check
        return username.matches("^[a-zA-Z0-9_]+@[a-zA-Z0-9]+(\\.[a-zA-Z]{2,5})+$");
    }

    private boolean startsWithUD48(String username) {
        return username.startsWith("UD49");
    }
    public boolean startWithAccessCode(String username){
        return username.startsWith("MUC");
    }

}
