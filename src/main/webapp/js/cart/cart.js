

(function() {

	'use strict';

	$CART.CartController = [
			'$scope',
			'$http',
			'Reddit',
			'etalage',
			'$location',
			'$timeout',
			function($scope, $http, Reddit, etalage, $location, $timeout) {
				
				$scope.template = etalage.getIncludeFile()[0];
				$scope.cartList = etalage.getCartList();
				$scope.cartListLength = $scope.cartList.length;
				cartAmount($scope.cartList, $scope.cartListLength);
				$scope.cartTotalCost = etalage.getTotalCost();
				$scope.carttotalItems = etalage.getTotalItems();
				
				function cartAmount(items, length) {
					$scope.totalPrice = price(items);
					$scope.delivaryCharges = 50* length;
					$scope.productPrice = $scope.totalPrice + (50 * length);	
				};
				
				function price(items) {
					var cost = 0;
					for (var i =0 ; i < items.length; i++) {
						if (items[i].quantity == undefined) {
							cost = cost + parseInt(items[i].pp);
							items[i].quantity = 1;
						} else {
							cost = cost + parseInt(items[i].pp) * parseInt(items[i].quantity);							
						}
					}
					return cost;
				};
				
//				$scope.itemChange = function(itemObj) {
//					var itemObjArray = [];
//					itemObjArray.push(itemObj);
//					price(itemObjArray);
//					$scope.cartTotalCost = etalage.getTotalCost();
//					$scope.carttotalItems = etalage.getTotalItems();
//					cartAmount($scope.cartList, $scope.cartListLength);
//				};
				
				$scope.emptyCart = function() {
					etalage.emptyCart();
					$scope.cartTotalCost = etalage.getTotalCost();
					$scope.carttotalItems = etalage.getTotalItems();
					
					$scope.cartList = etalage.getCartList();
					$scope.cartListLength = $scope.cartList.length;
					cartAmount($scope.cartList, $scope.cartListLength);
				};
				
				$scope.goToTheItem = function(productItem) {
					var pid = productItem.pid;
				$http (
						 {
							 method :  'GET',
							 url : $CART.cartRest + '/pbid?pid='+pid,
							 headers : {
									'Content-Type' : 'application/json'
								}
						 }).success(function(data) {
							 if (data == null || data == "") {
								 BootstrapDialog.alert("Fail to get cat details, contact administrator for support");
								 $location.url( '/products' );
							 }
							 var uri = "";
							 if (productItem.selectSize == undefined) {
								 uri = encodeURI('pid='+data.pid+'&im='+data.pVImages+'&s=c&qty='+productItem.quantity);	 
							 } else {
								 uri = encodeURI('pid='+data.pid+'&im='+data.pVImages+'&s=c&qty='+productItem.quantity+'&selectionsize='+productItem.selectSize);
							 }
							 
							  $location.url( '/pview?'+uri );
						 }).error(function(data, status, headers, config) {
							$scope.loading = false;
							BootstrapDialog.alert("Fail to get cat details, contact administrator for support");
						 });
				};
				
				$scope.removeCartItem = function(item) {
					$scope.cartList = etalage.getCartList();
					$scope.cartIds = etalage.getCartIds();
					var cartIdsLength = $scope.cartIds.length;
					var len = $scope.cartList.length; 
					for (var i =0 ; i < len; i++) {
						if ($scope.cartList[i].hash == item.hash) {
							//remove 1 element from index i;
							$scope.cartList.splice(i, 1);
							$scope.cartListLength = $scope.cartList.length; 
							etalage.removeCartList();
							etalage.assignCartList($scope.cartList);
							cartAmount($scope.cartList, $scope.cartListLength);
							break;
						}						
					}
					for (var j=0; j < cartIdsLength; j++) {
						if ($scope.cartIds[j] == item.pid) {
							//remove 1 element from index i;
							$scope.cartIds.splice(i, 1);
							etalage.removeCartIds();
							etalage.addCartIds($scope.cartIds);
							break;
						}
					}
					
					$scope.cartTotalCost = etalage.getTotalCost();
					$scope.carttotalItems = etalage.getTotalItems();
				};
			} ];
}

)();