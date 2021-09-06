'use strict';

/**
 * @ngdoc directive
 * @name comunitariaApp.directive: frontPageBottom
 * @description
 * # frontPageBottom
 */

angular.module('comunitariaApp').directive('translateFooter', [
	'$window',
	'$rootScope',
	function($window, $rootScope) {
		var linkFunction = function(scope, element, attributes) {
			scope.changeLanguage = function(a) {
				$rootScope.changeLanguage(a);
			};
		};

		return {
			restrict: 'EA',
			templateUrl: 'views/translate/translate.footer.html',
			scope: {
				id: '@id',
				opt: '@opt',
				user: '@user'
			},
			link: linkFunction
		};
	}
]);
