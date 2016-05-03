package com.cart.sql;

public class SqlQuery {

	public static final String GET_PRODUCTS = "SELECT productname, productid, productprice, productviewimg1, productviewimg2, productviewimg3, productcount FROM products";
	
	public static final String GET_PRODUCT_VIEW_BY_PRODUCT_ID = "SELECT p.productname, p.productprice, p.productid, pv.material, pv.color, pv.style, pv.brand, pv.details, pv.summary, pv.sizes FROM products p inner join productview pv ON p.productid = pv.productid AND p.productid=?";
}
