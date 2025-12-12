package com.eazybytes.eazystore.repository;

import com.eazybytes.eazystore.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}