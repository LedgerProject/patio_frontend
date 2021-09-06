'use strict';

/**
 * @ngdoc filter
 * @name comunitariaApp.filter:percentage
 * @function
 * @description
 * # percentage
 * Filter in the comunitariaApp.
 */
angular.module('comunitariaApp')
  .filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
      return $filter('number')(input * 100, decimals) + '%';
    };
  }]);
