

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
						cost = cost + parseInt(items[i].pp);
					}
					return cost;
				};
				
				$scope.emptyCart = function() {
					etalage.emptyCart();
					$scope.cartTotalCost = etalage.getTotalCost();
					$scope.carttotalItems = etalage.getTotalItems();
					
					$scope.cartList = etalage.getCartList();
					$scope.cartListLength = $scope.cartList.length;
					cartAmount($scope.cartList, $scope.cartListLength);
				};
				
				$scope.removeCartItem = function(item) {
					$scope.cartList = etalage.getCartList();
					$scope.cartIds = etalage.getCartIds();
					var cartIdsLength = $scope.cartIds.length;
					var len = $scope.cartList.length; 
					for (var i =0 ; i < len; i++) {
						if ($scope.cartList[i].pid = item.pid) {
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
				};
			} ];
}

)();