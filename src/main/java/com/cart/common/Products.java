package com.cart.common;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "products")
public class Products {

	private String imgPath;
	private List<String> productViewImages;
	private String productsName;
	private String productId;
	private String productPrice;
	private String itemsCount;

	@XmlElement(name = "pic")
	public String getItemsCount() {
		return itemsCount;
	}

	public void setItemsCount(String itemsCount) {
		this.itemsCount = itemsCount;
	}

	@XmlElement(name = "pn")
	public String getProductsName() {
		return productsName;
	}

	public void setProductsName(String productsName) {
		this.productsName = productsName;
	}

	@XmlElement(name = "pid")
	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	@XmlElement(name = "pp")
	public String getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(String productPrice) {
		this.productPrice = productPrice;
	}

	@XmlElement(name = "imgPath")
	public String getImgPath() {
		return imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}

	@XmlElement(name = "pVImages")
	public List<String> getProductViewImages() {
		return productViewImages;
	}

	public void setProductViewImages(List<String> productViewImages) {
		this.productViewImages = productViewImages;
	}

}
