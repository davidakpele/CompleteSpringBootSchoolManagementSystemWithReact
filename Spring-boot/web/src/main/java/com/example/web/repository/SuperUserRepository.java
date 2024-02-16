package com.example.web.repository;

import com.example.web.model.SuperUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuperUserRepository  extends JpaRepository<SuperUsers, Long> {

    Optional<SuperUsers> findByEmail(String email);
}
