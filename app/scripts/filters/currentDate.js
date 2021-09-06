'use strict';

/**
 * @ngdoc filter
 * @name comunitariaApp.filter:currentdate
 * @function
 * @description
 * # current date
 * Filter in the comunitariaApp.
 */
angular.module('comunitariaApp')
	.filter('currentdate',['$filter',  function($filter) {
	    return function() {
	        return $filter('date')(new Date(), 'MMM yyyy');
	    };
	}])