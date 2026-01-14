package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.constant.ApplicationConstants;
import com.eazybytes.eazystore.dto.OrderItemResponseDto;
import com.eazybytes.eazystore.dto.OrderRequestDto;
import com.eazybytes.eazystore.dto.OrderResponseDto;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.entity.Order;
import com.eazybytes.eazystore.entity.OrderItem;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.exception.ResourceNotFoundException;
import com.eazybytes.eazystore.repository.OrderRepository;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.service.IOrderService;
import com.eazybytes.eazystore.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final IProfileService profileService;

    @Override
    public void createOrder(OrderRequestDto orderRequest) {
        Customer customer = profileService.getAuthenticatedCustomer();
        // Crete order
        Order order = new Order();
        order.setCustomer(customer);
        BeanUtils.copyProperties(orderRequest, order);
        order.setOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);
        // Map OrderItems
        List<OrderItem> orderItems = orderRequest.getItems()
                .stream()
                .map(item -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    Product product = productRepository.findById(item.getProductId())
                            .orElseThrow(() -> new ResourceNotFoundException("Product", "ProductID",
                                    item.getProductId().toString()));
                    orderItem.setProduct(product);
                    orderItem.setQuantity(item.getQuantity());
                    orderItem.setPrice(item.getPrice());
                    return orderItem;
                }).collect(Collectors.toList());
        order.setOrderItems(orderItems);
        orderRepository.save(order);
    }

    @Override
    public  List<OrderResponseDto> getCustomerOrders() {
        Customer customer =profileService.getAuthenticatedCustomer();
        List<Order> orders = orderRepository.findByCustomerOrderByCreatedAtDesc(customer);
        return orders.stream().map(this::mapToOrderResponseDTO).collect(Collectors.toList());
    }

    @Override
    public List<OrderResponseDto> getAllPendingOrders() {
        List<Order> orders = orderRepository.findByOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);
        return orders.stream().map(this::mapToOrderResponseDTO).collect(Collectors.toList());
    }

    @Override
    public Order updateOrderStatus(Long orderId, String orderStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow(
                () -> new ResourceNotFoundException("Order", "OrderID", orderId.toString())
        );
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    private OrderResponseDto mapToOrderResponseDTO(Order order) {
        // Map Order Items
        List<OrderItemResponseDto> itemDTOs = order.getOrderItems().stream()
                .map(this::mapToOrderItemResponseDTO)
                .collect(Collectors.toList());
        return new OrderResponseDto(order.getOrderId()
                , order.getOrderStatus(), order.getTotalPrice(), order.getCreatedAt().toString()
                , itemDTOs);
    }

    private OrderItemResponseDto mapToOrderItemResponseDTO(OrderItem orderItem) {
        return new OrderItemResponseDto(
                orderItem.getProduct().getName(), orderItem.getQuantity(),
                orderItem.getPrice(), orderItem.getProduct().getImageUrl());
    }
}
