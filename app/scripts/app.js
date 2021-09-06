'use strict';

/**
 * @ngdoc overview
 * @name comunitariaApp
 * @description
 * # comunitariaApp
 *
 * Main module of the application.
 */
var myApp = angular
	.module('comunitariaApp', [
		'ngAnimate',
		'ngAria',
		'ngMaterial',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngSanitize',
		'ngTouch',
		'ui.router',
		'pascalprecht.translate',
		'nvd3',
		'angular-lodash',
		'angularFileUpload',
		'ngFileUpload',
		'ui.bootstrap',
		'bootstrapLightbox',
		'chart.js',
		'ja.qr'
	])
	/* Translation configuration */
	.config([
		'$translateProvider',
		function($translateProvider) {
			$translateProvider
				.useStaticFilesLoader({
					prefix: 'locale/',
					suffix: '.json'
				})
				.registerAvailableLanguageKeys([ 'es_ES', 'en_US' ], {
					'en_*': 'en_US',
					'es_*': 'es_ES',
					en: 'en_US',
					es: 'es_ES',
				})
				//.determinePreferredLanguage()
				.preferredLanguage('en_US')
				.useLocalStorage()
				.fallbackLanguage([ 'en_US' ]);
		}
	])
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	})
	.config([
		'$resourceProvider',
		function($resourceProvider) {
			// Don't strip trailing slashes from calculated URLs
			$resourceProvider.defaults.stripTrailingSlashes = false;
		}
	]);

myApp.run(function($rootScope, $mdMedia, $mdSidenav, $mdComponentRegistry, $timeout, $window, $translate, $location) {
	$rootScope.$watch(
		function() {
			return $mdMedia('gt-sm');
		},
		function(small) {
			$timeout(function() {
				if (small) {
					// $mdSidenav('left').close();
					$mdComponentRegistry.when('left').then(function() {
						$mdSidenav('left').close();
					});
				}
			}, 150);
			$rootScope.leftSidenavLockedOpen = !small;
		}
	);

	$rootScope.$mdMedia = $mdMedia;
	$rootScope.leftMenuOpen = true;
	$rootScope.leftSidenavLockedOpen = !$mdMedia('gt-sm');

	$rootScope.toggleLeftSidenav = function() {
		$mdSidenav('left').toggle().then(function() {
			$rootScope.leftSidenavLockedOpen = !$rootScope.leftSidenavLockedOpen;
		});
	};

	$rootScope.changeLanguage = function(langKey) {
		$translate.use(langKey);
	};

	$rootScope.activeLang = function(langKey) {
		if ($translate.use() === langKey) {
			return true;
		} else {
			return false;
		}
	};
});
