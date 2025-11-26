package com.eazybytes.eazystore.repository;

import com.eazybytes.eazystore.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByEmailOrMobileNumber(String email,String mobileNumber);

    Optional<Customer> findByEmail(String email);
}
