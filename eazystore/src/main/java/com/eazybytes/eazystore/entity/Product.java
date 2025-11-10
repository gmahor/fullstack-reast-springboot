package com.eazybytes.eazystore.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "PRODUCTS", uniqueConstraints = {
        @UniqueConstraint(name = "uc_product_product_id", columnNames = {"PRODUCT_ID"})
})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCT_ID", nullable = false)
    private Long id;

    @Column(name = "NAME", nullable = false, length = 250)
    private String name;

    @Column(name = "DESCRIPTION", nullable = false, length = 500)
    private String description;

    @Column(name = "PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "POPULARITY", nullable = false)
    private Integer popularity;

    @Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "CREATED_AT", nullable = false)
    private Instant createdAt;

    @Column(name = "CREATED_BY", nullable = false, length = 20)
    private String createdBy;

    @ColumnDefault("NULL")
    @Column(name = "UPDATED_AT")
    private Instant updatedAt;

    @ColumnDefault("NULL")
    @Column(name = "UPDATED_BY", length = 20)
    private String updatedBy;

}