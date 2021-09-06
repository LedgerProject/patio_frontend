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
  .filter('offset', function() {
    return function(input, start) {
      start = parseInt(start, 10);
      if(input){
        return input.slice(start);
      }else{
        return input;
      }

    };
  });
