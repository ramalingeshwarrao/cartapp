(function() {

	'use strict';

	$CART.ProductViewController = [
			'$scope',
			'$http',
			'etalage',
			'$timeout',
			function($scope, $http, etalage, $timeout) {
				
				$scope.productImages = etalage.getEtalageImages();
				$scope.productId = etalage.getProductId();
				
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

