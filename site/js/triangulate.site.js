// triangulate app
// triangulate.controllers 	-> js/triangulate.controllers.js
// triangulate.factories 	-> js/triangulate.factories.js
// triangulate.directives	-> js/triangulate.directives.js
angular.module('triangulate.site', dependencies)

// disable header during development
.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}])

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $i18nextProvider, $httpProvider) {

	// config $il8nextProvider
	$i18nextProvider.options = {
        lng: 'en',
        useCookie: false,
        useLocalStorage: false,
        fallbackLng: 'en',
        resGetPath: 'locales/__lng__/__ns__.json'
    };

	// set authInterceptor
	$httpProvider.interceptors.push('authInterceptor');
  
	$stateProvider

  	// #begin states
  	{{states}};
  	// #end states
    
  	// if none of the above states are matched, use this as the fallback
  	$urlRouterProvider.otherwise('index');
  	
})

.run(function($rootScope, $i18next, $window, Site) {
	
	// get cart from sessionStorage
	if(sessionStorage['triangulate-cart'] != null){
		var str = sessionStorage['triangulate-cart'];

		$rootScope.cart = eval(str);
	}
	else{
		$rootScope.cart = [];
	}
	
	
	// set site from session storage
	if($window.sessionStorage.site != null){
	
		var str = $window.sessionStorage.site;
		$rootScope.site = JSON.parse(str);
	
	}
	else{
		
		// init site
		Site.retrieve(function(data){
		
			// set site to $scope and $rootScope
			$rootScope.site = data;
			$window.sessionStorage.site = JSON.stringify(data);
			
		});
		
	}
	
	// init user
	$rootScope.user = null;
	
	// set user from session storage
	if($window.sessionStorage.user != null){
	
		var str = $window.sessionStorage.user;
		$rootScope.user = JSON.parse(str);
		
	}

	
});

