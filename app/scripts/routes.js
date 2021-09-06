'use strict';

/**
 * @ngdoc overview
 * @name comunitariaApp
 * @description
 * # comunitariaApp
 *
 * Routes of the app
 */
angular.module('comunitariaApp').config(function($stateProvider, $urlRouterProvider) {
	/* URL Slash trailing */
	$urlRouterProvider.rule(function($injector, $location) {
		var path = $location.path();
		var hasTrailingSlash = path[path.length - 1] === '/';

		if (hasTrailingSlash) {
			//if last charcter is a slash, return the same url without the slash
			var newPath = path.substr(0, path.length - 1);
			return newPath;
		}
	});
	$urlRouterProvider.otherwise('/');

	// Now set up the states
	$stateProvider
		.state('login', {
			url: '/',
			templateUrl: 'views/login/login.html',
			controller: 'LoginCtrl'
		})
		.state('logout', {
			url: '/logout',
			controller: 'LogoutCtrl'
		})
		.state('loading', {
			url: '/loading',
			templateUrl: 'views/loading/loading.html',
			controller: 'LoadingCtrl',
			params: {
				demo: false,
				direct_voting: false,
				voting_id: null,
				redirect_to: null
			}
		})
		.state('main', {
			url: '/:community',
			abstract: true,
			templateUrl: 'views/main/main.html',
			controller: 'MainCtrl',
			params: {
				change_community: false
			},
			resolve: {
				community: [
					'$stateParams',
					function($stateParams) {
						return $stateParams.community;
					}
				]
			}
		})
		.state('main.home', {
			url: '/home',
			templateUrl: 'views/home/home.html',
			controller: 'HomeCtrl',
			params: {
				first_login: false,
				newVotingForm: false,
				voting_id: null
			}
		})
		/* PATIO Routes */
		.state('main.scb', {
			url: '/scb',
			abstract: true,
			templateUrl: 'views/scb/scb.html',
			controller: 'ScbCtrl'
		})
			.state('main.scb.index', {
				url: '',
				templateUrl: 'views/scb.index/scb.index.html',
				controller: 'ScbIndexCtrl'
			})
			.state('main.scb.live', {
				url: '/live',
				templateUrl: 'views/scb.liveconsumption/scb.liveconsumption.html',
				controller: 'ScbLiveCtrl'
			})
			.state('main.scb.invoices', {
				url: '/invoices',
				templateUrl: 'views/scb.invoices/scb.invoices.html',
				controller: 'ScbInvoicesCtrl'
			})
});
