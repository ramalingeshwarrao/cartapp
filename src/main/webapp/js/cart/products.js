(function() {

	'use strict';

	$CART.ProductsController = [
			'$scope',
			'$http',
			'Reddit',
			'etalage',
			'$location',
			'$timeout',
			function($scope, $http, Reddit, etalage, $location, $timeout) {
				
			    $scope.template = etalage.getIncludeFile()[0];
				$scope.reddit = new Reddit();
				$scope.red = $scope.reddit;
				$scope.cartTotalCost = etalage.getTotalCost();
				$scope.carttotalItems = etalage.getTotalItems();
				
				$scope.productSel = function (item) {
				etalage.addEtalageImages(item.pVImages);
				etalage.addProductId(item.pid);
				var uri = encodeURI('pid='+item.pid+'&im='+item.pVImages+'&s=p');
				$location.url( '/pview?'+uri );
				};
				
				$scope.emptyCart = function() {
					etalage.emptyCart();
					$scope.cartTotalCost = etalage.getTotalCost();
					$scope.carttotalItems = etalage.getTotalItems();
				};
				
				
				
			} ];
}

)();