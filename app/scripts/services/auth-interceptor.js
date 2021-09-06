'use strict';

/**
 * @ngdoc service
 * @name comunitariaApp.authInterceptor
 * @description
 * # authInterceptor
 * Service in the comunitariaApp.
 */
angular.module('comunitariaApp').factory('authInterceptor', function($rootScope, $q, $window, AUTH_EVENTS, Session) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if (Session.token && Session.token != 'null') {
                config.headers.Authorization = 'Bearer ' + Session.token;
            }
            return config;
        },
        responseError: function(response) {
            if (response.status === 401) {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else if (response.status === 403) {
                $rootScope.$broadcast(AUTH_EVENTS.forbidden);
            }
            return $q.reject(response);
        }
    };
});