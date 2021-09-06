'use strict';

/**
 * @ngdoc service
 * @name comunitariaApp.AUTHEVENTS
 * @description
 * # AUTHEVENTS
 * Constant in the comunitariaApp.
 */
angular.module('comunitariaApp')
  .constant('AUTH_EVENTS', {
    'notAuthorized': 1,
    'forbidden': 2
  });
