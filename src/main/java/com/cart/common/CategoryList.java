package com.cart.common;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "catlist")
public class CategoryList {

	private List<CategoriesView> categoryView ;

	@XmlElement(name = "catviewlist")
	public List<CategoriesView> getCategoryView() {
		return categoryView;
	}

	public void setCategoryView(List<CategoriesView> categoryView) {
		this.categoryView = categoryView;
	}
	
	
}
