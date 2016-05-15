(function() {

	'use strict'; 

	//Define global variable
	var $CART = window.$CART, cartRest; 

	if (!$CART || typeof $CART != 'object') {
		$CART = window.$CART = {};
	}

	var MainModule;

	$CART.cartRest = "/cartapp/cart/cres";
	MainModule = angular.module('CartModule', [ 'ngRoute', 'ui.bootstrap', 'ngMaterial', 'infinite-scroll' ]);
	

		MainModule.factory('etalage', function() {
			
			var etalageImages = [];
			var productId = "";
			var etalageService = {};
			var cartIds = [];
			var cartList = [];
			var includeTemplates = [{
		        name: 'menu template',
		        url: './html/menu.html'}
		    ];
			
			etalageService.getIncludeFile = function() {
				return includeTemplates;
			};
			
			etalageService.getnerateHash = function(strToHash) {
				var hash =0, i, char;
				if (strToHash.length == 0) return hash;
				for (i =0; i < strToHash.length; i++) {
					char = strToHash.charCodeAt(i);
			        hash = ((hash<<5)-hash)+char;
			        hash = hash & hash; // Convert to 32bit integer
			    }
			    return hash;
			};
			
			etalageService.emptyCart = function() {
				cartList = [];
				cartIds = [];
			};
			
			function price() {
				var cost = 0;
				for (var i =0 ; i < cartList.length; i++) {
					if (cartList[i].quantity == undefined) {
						cost = cost + parseInt(cartList[i].pp);
						cartList[i].quantity = 1;
					} else {
						cost = cost + parseInt(cartList[i].pp) * parseInt(cartList[i].quantity);	
					}
				}
				return cost;
			};
			
			etalageService.getTotalItems = function() {
				return cartList.length;
			};
			
			etalageService.getTotalCost = function() {
				return price();
			};
			
			etalageService.removeCartList = function() {
				cartList = [];
			};
			
			etalageService.removeCartIds = function() {
				cartIds = [];
			};
			
			etalageService.addCartList = function(list) {
				cartList.push(list);
			};
			
			etalageService.getCartList = function() {
				return cartList;
			};
			
			etalageService.assignCartList = function(list) {
				cartList = list;
			};
			
			etalageService.getCartIds = function() {
				return cartIds;
			};
			
			etalageService.addCartIds = function(ids) {
				cartIds = ids;
			};
			
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
			this.loading = true;
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
			      this.loading = false;
			      this.busy = true;
			      //this.busy = false;
			    }.bind(this));
			
			
		};

		return Reddit;
	});

	//directive for mega menu
		MainModule.directive('cartmenu', ['$timeout', function($timeout) {
			return {
				restrict: 'A',
				link : function(scope, ele, attrs) {
					var $menuObj = $(ele);
					$timeout(function() {
						$menuObj.ready(function(){$(".megamenu").megamenu();});
					}, 10);
				}
			};
		}]);
		
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
		.when('/cart', {
			templateUrl : './html/cart.html',
			controller : $CART.CartController
		})
		.when('/menu', {
			templateUrl : './html/menu.html',
			controller : $CART.CartController
		})
		.otherwise({
			redirectTo : '/products'
			});


	} ]);

})();