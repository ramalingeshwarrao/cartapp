package com.cart.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.cart.common.Common;
import com.cart.common.ProductView;
import com.cart.common.Products;
import com.cart.dao.CartDAO;
import com.cart.sql.SqlQuery;

@Component
public class CartDAOImpl extends BaseDAO implements CartDAO {

	final static Logger LOG = Logger.getLogger(CartDAOImpl.class);

	@Override
	public List<Products> getProducts() {

		try {
			List<Products> productList = this.jdbcTemplate.query(
					SqlQuery.GET_PRODUCTS, new Object[] {},
					new RowMapper<Products>() {
						@Override
						public Products mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							Products products = new Products();
							List<String> productImgs = new ArrayList<String>();
							String productId = rs.getString("productid");
							products.setImgPath(productId+".jpg");
							String productName = rs.getString("productname");
							int productNameLen = productName.length();
							if (productNameLen > Common.PRODUCT_NAME_SIZE) {
								productName = productName.substring(0, 17)+" ...";
							}
							products.setProductsName(productName);
							products.setProductId(productId);
							products.setProductPrice(rs
									.getString("productprice"));
							String img = rs.getString("productviewimg1");
							if (StringUtils.isNotBlank(img))
								productImgs.add(img);
							img = rs.getString("productviewimg2");
							if (StringUtils.isNotBlank(img))
								productImgs.add(img);
							img = rs.getString("productviewimg3");
							if (StringUtils.isNotBlank(img))
								productImgs.add(img);
							products.setProductViewImages(productImgs);
							return products;
						}
					});
			if (productList != null && productList.size() > 0) {
				return productList;
			}
		} catch (Exception e) {
			LOG.error("Fail to getproduct details ", e);
			return null;
		}
		return null;
	}

	@Override
	public ProductView getProductView(String productId) {

		try {
			List<ProductView> productViewList = this.jdbcTemplate.query(
					SqlQuery.GET_PRODUCT_VIEW_BY_PRODUCT_ID, new Object[] {productId},
					new RowMapper<ProductView>() {
						@Override
						public ProductView mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							ProductView productView = new ProductView();
							productView.setProductPrice(rs.getString("p.productprice"));
							productView.setProductName(rs.getString("productname"));
							productView.setProductId(rs.getString("productid"));
							productView.setMaterial(rs.getString("material"));
							productView.setColor(rs.getString("color"));
							productView.setStyle(rs.getString("style"));
							productView.setBrand(rs.getString("brand"));
							productView.setDetails(rs.getString("details"));
							productView.setSummary(rs.getString("summary"));
							return productView;
						}
					});
			if (productViewList != null && productViewList.size() > 0) {
				return productViewList.get(0);
			}
		} catch (Exception e) {
			LOG.error("Fail to getproduct details ", e);
			return null;
		}
		return null;
	}

}
