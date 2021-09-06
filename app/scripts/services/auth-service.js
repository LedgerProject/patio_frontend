'use strict';

/**
 * @ngdoc service
 * @name comunitariaApp.authService
 * @description
 * # AuthService
 * Service in the comunitariaApp.
 */
angular.module('comunitariaApp').factory('AuthService', function($http, $rootScope, Session, backend, api, $window) {
    var authService = {};
    var defaultBackState = 'main.home';
    var backStateParams = {};
    var backState = defaultBackState;
    var user = {};

    authService.init = function() {
        Session.init();
        if (!!Session.token) {
            api.invalidateCache();
        }
    };

    authService.login = function(credentials) {
        return $http.post(backend + '/api-token-auth/', credentials).then(function(res) {
            Session.create(res.data.access);
            // Session.create(res.data.token);
            api.invalidateCache();
            return;
        });
    };

    authService.user = function() {
        return user;
    };

    authService.logout = function() {
        Session.destroy();
    };

    authService.isAuthenticated = function() {
        if (Session.token === 'null' || Session.token === null || !Session.token) {
            return false;
        } else {
            return true;
        }
    };

    authService.isAuthorized = function(authorizedRoles) {
        return authService.isAuthenticated();
    };

    authService.setBackState = function(back, p) {
        backState = back;
        backStateParams = p;
    };

    authService.getBackState = function() {
        var ret = backState;
        var retParams = backStateParams;
        backState = defaultBackState;
        backStateParams = {};

        return { state: ret, params: retParams };
    };

    authService.userInstance = function() {};

    return authService;
});