package com.cart.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.cart.provider.DataSourceProvider;

@Repository
public class BaseDAO {

	protected JdbcTemplate jdbcTemplate;
	protected SimpleJdbcTemplate simpleJdbcTemplate;
	protected NamedParameterJdbcTemplate namedjdbcTemplate;
	
	 @Autowired
	 public void setJdbcTemplate(DataSourceProvider dataSourceProvider) {
		 this.jdbcTemplate = new JdbcTemplate(dataSourceProvider);
		 this.simpleJdbcTemplate= new SimpleJdbcTemplate(dataSourceProvider);
	     this.namedjdbcTemplate = new NamedParameterJdbcTemplate(dataSourceProvider);  
	 }
}
