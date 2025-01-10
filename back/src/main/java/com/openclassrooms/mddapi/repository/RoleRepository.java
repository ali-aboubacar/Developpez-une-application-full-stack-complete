package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.ERole;
import com.openclassrooms.mddapi.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
