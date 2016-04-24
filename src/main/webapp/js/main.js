(function() {

	'use strict'; 

	//Define global variable
	var $CART = window.$CART, cartRest; 

	if (!$CART || typeof $CART != 'object') {
		$CART = window.$CART = {};
	}

	var MainModule;

	$CART.cartRest = "/cartapp/cart/cres";
	MainModule = angular.module('CartModule', [ 'ngRoute', 'infinite-scroll' ]);
	

		MainModule.factory('etalage', function() {
			
			var etalageImages = [];
			var productId = "";
			var etalageService = {};
			
			etalageService.addProductId = function(pid) {
				productId = pid;
			};
			
			etalageService.getProductId = function() {
				return productId;
			};
			
			etalageService.addEtalageImages = function(images) {
				etalageImages = images;
			};
			
			etalageService.getEtalageImages = function() {
				return etalageImages;
			};
			
			return etalageService;
			
		});

		MainModule.factory('Reddit', function($http) {
		var Reddit = function() {
			this.items = [];
			this.busy = false;
			this.after = '';
		};
		Reddit.prototype.nextPage = function() {
			if (this.busy)
				return;
			this.busy = true;
			
			$http.get($CART.cartRest + '/plist').success(function(data) {
			      var items = data.products;
			      for (var i = 0; i < items.length; i++) {
			        this.items.push(items[i]);
			      }
			      //this.after = "t3_" + this.items[this.items.length - 1].id;
			      this.busy = true;
			      //this.busy = false;
			    }.bind(this));
			
			
		};

		return Reddit;
	});
		
	//directive for jquery etalage
		MainModule.directive('etalagedirective', ['$timeout', function($timeout) {
			return {
				restrict: 'A',
			    link : function(scope, ele, attrs){
			    	var $eta = $(ele);
			    	$timeout($eta.etalage({
						thumb_image_width: 300,
						thumb_image_height: 400,
						source_image_width: 900,
						source_image_height: 1200,
						show_hint: true,
						src:"test",
						click_callback: function(image_anchor, instance_id){
							alert('Callback example:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
						}
					}));
			    }
			};
		}]);

	// Add config
	MainModule.config([ '$routeProvider', function($routeProvider) {

		$routeProvider.when('/products', {
			templateUrl : './html/products.html',
			controller : $CART.ProductsController
		})
		.when('/products-test', {
			templateUrl : './html/products-test.html',
			controller : $CART.ProductsController
		})
		.when('/pview', {
			templateUrl : './html/productView.html',
			controller : $CART.ProductViewController
		})
		.when('/ram', {
			templateUrl : './html/products-ram.html',
			controller : $CART.ProductsController
		})
		.when('/test', {
			templateUrl : './html/test.html',
			controller : $CART.HomeController
		})
		.otherwise({
			redirectTo : '/products'
			});


	} ]);

})();