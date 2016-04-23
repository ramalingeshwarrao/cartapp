package com.cart.resource;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.security.access.method.P;
import org.springframework.stereotype.Component;

import com.cart.common.CategoriesView;
import com.cart.common.CategoryList;
import com.cart.common.Products;


@Component
@Path("/cres")
public class CartResource {

	@GET
	@Path("search")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED })
	@Produces({ MediaType.APPLICATION_JSON })
	public Products getCartData() {
		Products cart = new Products();
		cart.setImgPath("test");
		System.out.println("test");
		return cart;
		
	}
	
	
	@GET
	@Path("plist")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED })
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Products> getProductsList() {
		System.out.println("test");
		List<Products> pList = new ArrayList<Products>();
		Products p1 = new Products();
		List<String> productViewImages = new ArrayList<String>();
		p1.setImgPath("images/p4.jpg");
		p1.setProductId("ID: SR4598");
		p1.setProductsName("SPENCER 3+1+1 SOFA SET WITH 5 BIG CUSHIONS & WOODEN HANDLE");
		p1.setProductPrice("$187.95");
		productViewImages.add("images/ts1.jpg");
		productViewImages.add("images/ts2.jpg");
		productViewImages.add("images/ts3.jpg");
		p1.setProductViewImages(productViewImages);
		pList.add(p1);
		Products p2 = new Products();
		List<String> productViewImages2 = new ArrayList<String>();
		p2.setImgPath("images/p4.jpg");
		p2.setProductId("ID: SR4598");
		p2.setProductsName("Test1");
		p2.setProductPrice("$187.95");
		productViewImages2.add("images/ts11.jpg");
		productViewImages2.add("images/ts2.jpg");
		productViewImages2.add("images/ts3.jpg");
		p2.setProductViewImages(productViewImages2);
		pList.add(p2);
		Products p3 = new Products();
		List<String> productViewImages3 = new ArrayList<String>();
		p3.setImgPath("images/p6.jpg");
		p3.setProductId("ID: SR4598");
		p3.setProductsName("Test2");
		p3.setProductPrice("$187.95");
		productViewImages3.add("images/ss1.jpg");
		productViewImages3.add("images/ss2.jpg");
		productViewImages3.add("images/ss33.jpg");
		productViewImages3.add("images/ts3.jpg");
		p3.setProductViewImages(productViewImages3);
		pList.add(p3);
//		Products p4 = new Products();
//		p4.setImgPath("images/p7.jpg");
//		p4.setProductId("ID: SR4598");
//		p4.setProductsName("Sofa Cum Bed");
//		p4.setProductPrice("$187.95");
//		pList.add(p4);
//		Products p5 = new Products();
//		p5.setImgPath("images/p1.jpg");
//		p5.setProductId("ID: SR4598");
//		p5.setProductsName("Sofa Cum Bed");
//		p5.setProductPrice("$187.95");
//		pList.add(p5);
//		Products p6 = new Products();
//		p6.setImgPath("images/p8.jpg");
//		p6.setProductId("ID: SR4598");
//		p6.setProductsName("Sofa Cum Bed");
//		p6.setProductPrice("$187.95");
//		pList.add(p6);
//		Products p7 = new Products();
//		p7.setImgPath("images/p9.jpg");
//		p7.setProductId("ID: SR4598");
//		p7.setProductsName("Sofa Cum Bed");
//		p7.setProductPrice("$187.95");
//		pList.add(p7);
		return pList;
	}
	
	
}
