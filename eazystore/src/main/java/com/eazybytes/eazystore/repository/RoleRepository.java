package com.eazybytes.eazystore.repository;

import com.eazybytes.eazystore.entity.Role;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    // Caches the role by name on first fetch
    @Cacheable("roles")
    Optional<Role> findByName(String name);

    // Updates cache when role is saved/updated
//    @CachePut(value = "roles",key = "#role.name")
//    Role save(Role role);

    // Evicts role from cache when deleted by name
//    @CacheEvict(value = "roles",key="#name")
//    void deleteByName(String name);

    // Clear all role cache entries
//    @CacheEvict(value = "roles",allEntries = true)
//    void deleteAll(); // Only if appropriate

}