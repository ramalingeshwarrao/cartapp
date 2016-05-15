(function() {

	'use strict';

	$CART.ProductViewController = [
	                               '$scope',
	                               '$http',
	                               'etalage',
	                               '$timeout',
	                               '$location',
	                               function($scope, $http, etalage, $timeout, $location) {

	                            	   //To include menu
	                            	   $scope.template = etalage.getIncludeFile()[0];
	                            	   $scope.loading = true;
	                            	   $scope.cartTotalCost = etalage.getTotalCost();
	                            	   $scope.carttotalItems = etalage.getTotalItems();
	                            	   var paramValues = $location.search(); 
	                            	   var images = paramValues.im;
	                            	   $scope.productImages = images.split(",");
	                            	   $scope.isCartIdAvail = false;
	                            	   $scope.productId = paramValues.pid;
	                            	   //Get the source (from product screen or cart screen)
	                            	   var src = paramValues.s;
	                            	   var cartQty = undefined;
	                            	   var sizeSelectValue = undefined;
	                            	   if (src == "c") {
	                            		   cartQty = parseInt(paramValues.qty);
	                            		   sizeSelectValue = paramValues.selectionsize; 
	                            	   }
	                            	   $scope.cartids = etalage.getCartIds();
	                            	   $scope.cartList = etalage.getCartList();
	                            	   function refresh() {
	                            		   for (var i=0; i < $scope.cartids.length; i++) {
	                            			   var id = $scope.cartids[i];
	                            			   if (id == $scope.productId) {
	                            				   $scope.isCartIdAvail = true;
	                            				   var filterList = $scope.cartList.filter(function(o){return o.pid == id;} );
	                            				   if (filterList.length == undefined) {
	                            					   $scope.productList = [filterList];
	                            				   } else {
	                            					   $scope.productList = filterList;
	                            				   }
	                            				   $scope.productItem = $scope.productList[0];
	                            				   populateProductViewData($scope.productList[0]);
	                            				   break;
	                            			   }
	                            		   }
	                            	   }
	                            	   refresh();


	                            	   $scope.addToCart = function() {
	                            		   $scope.cartids.push($scope.productId);
	                            		   etalage.addCartIds($scope.cartids);

	                            		   if ($scope.quantity == undefined){
	                            			   BootstrapDialog.alert("Please Select Quantity");
	                            			   return;
	                            		   }

	                            		   if ($scope.isSizeSelectValue == "" && $scope.isSizesVisible) {
	                            			   BootstrapDialog.alert("Please Select Size");
	                            			   return;
	                            		   } 

	                            		   function cartUpdate(object) {
	                            			   if ($scope.isSizesVisible && object.selectSize == $scope.isSizeSelectValue && object.pid == $scope.productId) {
	                            				   return true;
	                            			   } else {
	                            				   return false;
	                            			   }
	                            		   }
	                            		   //For this product size is applicable
	                            		   var isProductAvailInList = false;
	                            		   if ($scope.isSizesVisible) {
	                            			   var isSizeAvailabeInList = $scope.productList.filter(function(o){return cartUpdate(o);} );
	                            			   if (isSizeAvailabeInList.length == 0 ) {
	                            				   isProductAvailInList = true;
	                            			   }
	                            		   }

	                            		   for (var i=0; i < $scope.productList.length; i++) {
	                            			   if ( $scope.productList[i].pid == $scope.productId && $scope.isSizesVisible && ($scope.productList[i].selectSize == undefined || isProductAvailInList) ) {
	                            				   var addProduct = angular.copy($scope.productList[i]);
	                            				   addProduct.selectSize = $scope.isSizeSelectValue;
	                            				   var hashcode = etalage.getnerateHash(addProduct.pid.concat(addProduct.selectSize));
	                            				   addProduct.quantity = $scope.quantity;
	                            				   addProduct.hash = hashcode;
	                            				   etalage.addCartList(addProduct);
	                            				   break;
	                            			   } 
	                            			   else if ( $scope.productList[i].pid == $scope.productId && $scope.productList[i].selectSize == $scope.isSizeSelectValue && $scope.isSizesVisible) {
	                            				   $scope.productList[i].quantity = $scope.quantity;
	                            				   break;
	                            			   } else if ($scope.productList[i].pid == $scope.productId && $scope.productList[i].quantity == undefined && !$scope.isSizesVisible) {
	                            				   $scope.productList[i].quantity = $scope.quantity;
	                            				   var hashcode = etalage.getnerateHash($scope.productList[i].pid);
	                            				   $scope.productList[i].hash = hashcode;
	                            				   etalage.addCartList($scope.productList[i]);
	                            				   break;
	                            			   } else if ($scope.productList[i].pid == $scope.productId && !$scope.isSizesVisible ) {
	                            				   $scope.productList[i].quantity = $scope.quantity;
	                            				   break;
	                            			   }
	                            		   }
	                            		   //etalage.addCartList($scope.productList);
	                            		   $scope.cartTotalCost = etalage.getTotalCost();
	                            		   $scope.carttotalItems = etalage.getTotalItems();
	                            		   $scope.isCartIdAvail = true;
	                            		   refresh();
	                            	   };

	                            	   $scope.emptyCart = function() {
	                            		   etalage.emptyCart();
	                            		   $scope.cartTotalCost = etalage.getTotalCost();
	                            		   $scope.carttotalItems = etalage.getTotalItems();
	                            		   $scope.isCartIdAvail = false;
	                            		   $scope.productList = [$scope.productItem];
	                            		   if ($scope.productList[0].quantity != undefined) {
	                            			   $scope.productList[0].quantity = undefined;
	                            		   }
	                            		   if ($scope.productList[0].selectSize != undefined) {
	                            			   $scope.productList[0].selectSize = "";
	                            		   }
	                            	   };

	                            	   $scope.isSizeSelectValue = "";
	                            	   $scope.selSize = function(size) {
	                            		   $scope.isSizeSelectValue = size; 
	                            	   };

	                            	   $scope.productViewDetails = function() {
	                            		   $http (
	                            				   {
	                            					   method :  'GET',
	                            					   url : $CART.cartRest + '/pview?pid='+$scope.productId,
	                            					   headers : {
	                            						   'Content-Type' : 'application/json'
	                            					   }
	                            				   }).success(function(data) {
	                            					   $scope.productItem = data;
	                            					   if (data.length == undefined) {
	                            						   $scope.productList = [data];
	                            					   } 
	                            					   populateProductViewData($scope.productList[0]);
	                            				   }).error(function(data, status, headers, config) {
	                            					   $scope.loading = false;
	                            					   BootstrapDialog.alert("Fail to get cat details, contact administrator for support");
	                            				   });
	                            	   };

	                            	   function populateProductViewData(data) {
	                            		   $scope.summary = data.summary.split(',');
	                            		   if (data.sizes != null && data.sizes != "" && data.sizes != undefined && data.sizes != 'null') {
	                            			   $scope.sizes = data.sizes.split(',');
	                            			   $scope.isSizesVisible = true;
	                            		   } else {
	                            			   $scope.isSizesVisible = false;
	                            		   }	
	                            	   }

	                            	   if (!$scope.isCartIdAvail) {
	                            		   $scope.productViewDetails();					
	                            	   }

	                            	   $timeout(function() {
	                            		   $('#etalage').etalage({
	                            			   thumb_image_width: 300,
	                            			   thumb_image_height: 400,
	                            			   source_image_width: 900,
	                            			   source_image_height: 1200,
	                            			   show_hint: true,
	                            			   click_callback: function(image_anchor, instance_id){
	                            				   alert('Callback example:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
	                            			   }
	                            		   });
	                            	   }, 3000);

	                            	   $timeout(function() {
	                            		   $scope.loading = false;
	                            	   }, 3000);


	                            	   if (src == "c") {
	                            		   $scope.quantity = cartQty;
	                            		   $scope.isSizeSelectValue = paramValues.selectionsize; 
	                            	   }
	                               } ];
}

)();

