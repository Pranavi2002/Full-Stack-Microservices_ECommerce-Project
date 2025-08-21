package com.example.order_service.service;

import com.example.order_service.client.ProductClient;
import com.example.order_service.dto.ProductResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;

@Service
public class ProductResilienceService {

    private final ProductClient productClient;

    public ProductResilienceService(ProductClient productClient) {
        this.productClient = productClient;
    }

    @CircuitBreaker(name = "productClient", fallbackMethod = "productFallback")
    public ProductResponse getProduct(Long productId) {
        return productClient.getProductById(productId);
    }

    // Fallback method signature must match original + Throwable
    public ProductResponse productFallback(Long productId, Throwable t) {
        ProductResponse fallback = new ProductResponse();
        fallback.setId(productId);
        fallback.setName("Fallback Product");
        fallback.setPrice(0.0);
        fallback.setStock(0);
        return fallback;
    }
}
