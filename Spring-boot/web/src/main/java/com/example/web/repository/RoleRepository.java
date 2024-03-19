package com.example.web.repository;

import com.example.web.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByClearance(String clearance);
    
    Optional<Role> findById(Long userRoleId);


    @Query("SELECT r.id FROM Role r WHERE r.clearance = :clearance")
    Optional<Long> findIdByClearance(@Param("clearance") String clearance);
}

