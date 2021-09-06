'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the comunitariaApp
 */
angular.module('comunitariaApp')
  .controller('LogoutCtrl', function ($scope, AuthService, $state) {
    AuthService.logout();
    $state.go('login'); 
  });
