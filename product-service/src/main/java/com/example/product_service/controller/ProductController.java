package com.example.product_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.product_service.entity.Product;
import com.example.product_service.repository.ProductRepository;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Matches /products and /products/
    @GetMapping({"", "/"})
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping({"", "/"})
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

}
