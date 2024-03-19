package com.example.web.services;

import com.example.web.model.Categories;
import com.example.web.model.Role;
import com.example.web.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Optional<Role> findRoleByClearance(String clearance) {
        return roleRepository.findByClearance(clearance);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> findById(Long userRoleId) {
        return roleRepository.findById(userRoleId);
    }

    public Optional<Long> findRoleIdByClearance(String clearance) {
        return roleRepository.findIdByClearance(clearance);
    }
}
