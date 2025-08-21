package com.example.order_service.client;

import com.example.order_service.dto.ProductResponse;
import org.springframework.stereotype.Component;

@Component
public class ProductClientFallback implements ProductClient {

    @Override
    public ProductResponse getProductById(Long id) {
        // Return a default product to prevent exceptions
        ProductResponse fallbackProduct = new ProductResponse();
        fallbackProduct.setId(id);
        fallbackProduct.setName("Fallback Product");
        fallbackProduct.setPrice(0.0);
        fallbackProduct.setStock(0);
        return fallbackProduct;
    }
}
