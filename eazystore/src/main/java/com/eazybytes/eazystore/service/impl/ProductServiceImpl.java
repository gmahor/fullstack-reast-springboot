package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.ProductDto;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.service.IProductService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ProductDto> getProducts() {
        return productRepository
                .findAll()
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }


    @Override
    public List<ProductDto> searchProducts(String value) {
        List<Product> products;
        products = productRepository.findByNameContainsIgnoreCase(value);
        if (products.isEmpty()) {
            products = productRepository.findByDescriptionContainsIgnoreCase(value);
        }
        return products
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> sortProducts(String value) {
        Pageable pageable;
        if ("Price Low to High".equals(value)) {
            pageable = PageRequest.of(0, 100, Sort.by("price").ascending());
        } else if ("Price High to Low".equals(value)) {
            pageable = PageRequest.of(0, 100, Sort.by("price").descending());
        } else {
            pageable = PageRequest.of(0, 100, Sort.by("popularity").descending());
        }
        return productRepository
                .findAll(pageable)
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(long id) {
        return productRepository
                .findById(id)
                .map(this::transformToDTO)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    private ProductDto transformToDTO(Product product) {
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto);
        productDto.setProductId(product.getId());
        return productDto;
    }
}
