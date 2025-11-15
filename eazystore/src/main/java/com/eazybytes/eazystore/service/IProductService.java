package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.ProductDto;

import java.util.List;

public interface IProductService {

    List<ProductDto> getProducts();

    List<ProductDto> searchProducts(String value);

    List<ProductDto> sortProducts(String value);

    ProductDto getProductById(long id);
}
