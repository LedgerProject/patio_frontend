'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the comunitariaApp
 */
angular.module('comunitariaApp')
    .controller('DemoTestCtrl', function($scope, $state, AuthService) {
        $scope.credentials = {
            username: 'demo',
            password: 'demo'
        };

        $scope.errors = {};

        AuthService.login($scope.credentials).then(function(user) {
            //$state.go('main.home');
            $state.go('loading', { demo: true });
        }, function() {
            $scope.errors.wrong = true;
            $scope.loading = false;
        });

    });