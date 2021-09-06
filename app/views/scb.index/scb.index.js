'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:ScbCtrl
 * @description
 * # ScbCtrl
 * Controller of the comunitariaApp
 */
angular
	.module('comunitariaApp')
	.controller('ScbIndexCtrl', function($scope, $filter, community, api, $state, $mdDialog, $window, $timeout) {
		$('.nav').hide();
		$('h4.m-title span').text('SMART COMMUNITY BRAIN');
	});
