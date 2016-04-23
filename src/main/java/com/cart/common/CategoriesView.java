package com.cart.common;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "catView")
public class CategoriesView {

	private String catName;
	
	private Map<String, String> catList = new LinkedHashMap<String, String>();;
	
	@XmlElement(name = "catname")
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}
	
	@XmlElementWrapper(name = "catlist")
	public Map<String, String> getCatList() {
		return catList;
	}
	public void setCatList(Map<String, String> catList) {
		this.catList = catList;
	}
	
	
}
