package com.cart.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.cart.common.ProductView;
import com.cart.common.Products;

@Component
public interface CartDAO {

	public List<Products> getProducts();
	public Products getProductById(String productId);
	public ProductView getProductView(String productId);
	
}
