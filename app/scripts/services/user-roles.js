'use strict';

/**
 * @ngdoc service
 * @name comunitariaApp.userRoles
 * @description
 * # userRoles
 * Constant in the comunitariaApp.
 */
angular.module('comunitariaApp')
  .constant('userRoles', {
    all: '*',
    admin: 'admin',
    provider: 'provider',
    user: 'user',
    president: 'president'
  });
