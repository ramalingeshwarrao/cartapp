package com.cart.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.cart.common.ProductView;
import com.cart.common.Products;

@Component
public interface CartService {

	public List<Products> getProducts();
	public ProductView getProductView(String productId);
	
}
