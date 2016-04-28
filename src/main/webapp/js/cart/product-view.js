(function() {

	'use strict';

	$CART.ProductViewController = [
			'$scope',
			'$http',
			'etalage',
			'$timeout',
			'$location',
			function($scope, $http, etalage, $timeout, $location) {
				
				var paramValues = $location.search(); 
				var images = paramValues.im
				$scope.productImages = images.split(",");
				$scope.isCartIdAvail = false;
				$scope.productId = paramValues.pid;
				$scope.cartids = etalage.getCartIds();
				$scope.cartList = etalage.getCartList();
				for (var i=0; i < $scope.cartids.length; i++) {
					var id = $scope.cartids[i];
					if (id == $scope.productId) {
						$scope.isCartIdAvail = true;
						break;
					}
				}
				
				$scope.addToCart = function() {
					$scope.cartids.push($scope.productId);
					etalage.addCartIds($scope.cartids);
					etalage.addCartList($scope.productList);
					$scope.isCartIdAvail = true;
				};
				
				$scope.emptyCart = function() {
					$scope.cartids = {};
					etalage.addCartIds({});
					etalage.removeCartList();
					$scope.isCartIdAvail = false;
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
							 $scope.productList = data;
							 $scope.summary = data.summary.split(',');
						 }).error(function(data, status, headers, config) {
							$scope.loading = false;
							BootstrapDialog.alert("Fail to get cat details, contact administrator for support");
						 });
				};
				$scope.productViewDetails();
				
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
					

				
			} ];
}

)();

