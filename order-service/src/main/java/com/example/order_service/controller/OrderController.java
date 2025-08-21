package com.example.order_service.controller;
import com.example.order_service.dto.OrderRequest;
import com.example.order_service.entity.Order;
import com.example.order_service.service.OrderService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Matches /orders and /orders/
    @PostMapping({"", "/"})
//    public Order placeOrder(@RequestBody Order order) {
//        return orderService.placeOrder(order);
//    }
    public Order placeOrder(@Valid @RequestBody OrderRequest request) {
        return orderService.placeOrder(request);
    }

    @GetMapping({"", "/"})
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
