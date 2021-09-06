'use strict';

/**
 * @ngdoc service
 * @name comunitariaApp.session
 * @description
 * # session
 * Service in the comunitariaApp.
 */
angular.module('comunitariaApp')
  .service('Session', function ($window) {
    this.token = $window.localStorage.token;

    this.init = function(){
      if ($window.localStorage.token){
        this.create($window.localStorage.token);
      }
    };

    this.create = function (token) {
      this.token = token;
      $window.localStorage.token = token;
    };
    this.destroy = function () {
      this.token = null;
      $window.localStorage.token = null;
    };
    return this;
  })
