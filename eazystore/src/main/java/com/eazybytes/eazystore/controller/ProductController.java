package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ProductDto;
import com.eazybytes.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService iProductService;

    @GetMapping("/getProducts")
    public ResponseEntity<List<ProductDto>> getProducts() throws InterruptedException {
        List<ProductDto> products = iProductService.getProducts();
        if (products.isEmpty()) {
            products = Collections.emptyList();
        }
        return ResponseEntity
                .ok()
                .body(products);
    }

    @GetMapping("/search/{value}")
    public ResponseEntity<List<ProductDto>> searchProducts(@PathVariable String value) throws InterruptedException {
        List<ProductDto> products = iProductService.searchProducts(value);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/sort/{value}")
    public ResponseEntity<List<ProductDto>> sortProducts(@PathVariable String value) {
        List<ProductDto> products = iProductService.sortProducts(value);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/getProduct/{value}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable long value) {
        ProductDto product = iProductService.getProductById(value);
        return ResponseEntity.ok(product);
    }

}

