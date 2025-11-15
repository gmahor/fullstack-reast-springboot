package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ProductDto;
import com.eazybytes.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService iProductService;

    @GetMapping
    public List<ProductDto> getProducts() throws InterruptedException {
        return iProductService.getProducts();
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

    @GetMapping("/{value}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable long value) {
        ProductDto product = iProductService.getProductById(value);
        return ResponseEntity.ok(product);
    }

}

