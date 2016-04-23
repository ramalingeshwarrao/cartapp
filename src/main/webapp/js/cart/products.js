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
				$scope.reddit = new Reddit();
				$scope.red = $scope.reddit;
				
				$scope.productSel = function (item) {
				etalage.addEtalageImages(item.pVImages);
				$location.path( '/pview' );
				
				};
				
				$scope.catdetails = function() {
					$http (
						 {
							 method :  'GET',
							 url : $CART.cartRest + '/clist',
							 headers : {
									'Content-Type' : 'application/json'
								}
						 }).success(function(data) {
							 $scope.catList = data.catView;
						 }).error(function(data, status, headers, config) {
							$scope.loading = false;
							BootstrapDialog.alert("Fail to get cat details, contact administrator for support");
						 });
				};
				$scope.catdetails();
				
				$timeout(function() {
					$(".tab0 .single-bottom").hide();
					$(".tab1 .single-bottom").hide();
					
					$(".tab1 ul").click(function(){
						$(".tab1 .single-bottom").slideToggle(300);
					});
					$(".tab0 ul").click(function(){
						$(".tab0 .single-bottom").slideToggle(300);
					});
				}, 100);
				
				
				
				
			} ];
}

)();