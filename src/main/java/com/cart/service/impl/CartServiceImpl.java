package com.cart.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cart.common.ProductView;
import com.cart.common.Products;
import com.cart.dao.CartDAO;
import com.cart.service.CartService;

@Component
public class CartServiceImpl implements CartService{
	
	@Autowired(required=true)
	CartDAO cartDAO;

	@Override
	public List<Products> getProducts() {
		return cartDAO.getProducts();
	}

	@Override
	public ProductView getProductView(String productId) {
		return cartDAO.getProductView(productId);
	}

}
