package com.example.order_service.service;

import com.example.order_service.client.ProductClient;
import com.example.order_service.dto.OrderRequest;
import com.example.order_service.dto.ProductResponse;
import com.example.order_service.entity.Order;
import com.example.order_service.exception.OutOfStockException;
import com.example.order_service.repository.OrderRepository;
import org.springframework.stereotype.Service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
//    private final ProductClient productClient;
    private final ProductResilienceService productResilienceService;

//    public OrderService(OrderRepository orderRepository, ProductClient productClient) {
//        this.orderRepository = orderRepository;
//        this.productClient = productClient;
//    }
    
    public OrderService(OrderRepository orderRepository,ProductResilienceService productResilienceService) {
		this.orderRepository = orderRepository;
		this.productResilienceService = productResilienceService;
	  }

    public Order placeOrder(OrderRequest request) {
        
//    	// Check exception feature
//    	// Fetch product from Product Service
//        ProductResponse product;
//        try {
//            product = productClient.getProductById(request.getProductId());
//            if (product == null) {
//                throw new IllegalArgumentException("Product not found with id: " + request.getProductId());
//            }
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to fetch product from Product Service", e);
//        }
    	
    	// Fetch product using the Resilience-enabled service
        ProductResponse product = productResilienceService.getProduct(request.getProductId());

        if (product == null || product.getId() == null) {
            throw new IllegalArgumentException("Product not found with id: " + request.getProductId());
        }

        // Check stock
        if (product.getStock() < request.getQuantity()) {
//            throw new OutOfStockException(
//                "Product out of stock or insufficient stock: " + product.getName() +
//                ". Available: " + product.getStock() + ", Requested: " + request.getQuantity()
//            );
        	throw new IllegalArgumentException(
                    "Requested quantity (" + request.getQuantity() + ") exceeds available stock (" + product.getStock() + ") for product: " + product.getName()
                ); // global exception usage
        }

        // Create order
        Order order = new Order();
        order.setProductId(product.getId());
        order.setQuantity(request.getQuantity());
        order.setTotalAmount(product.getPrice() * request.getQuantity());

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
