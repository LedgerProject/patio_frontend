'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the comunitariaApp
 */
angular
	.module('comunitariaApp')
	.controller('LoginCtrl', function(
		$scope,
		$stateParams,
		$location,
		$rootScope,
		$window,
		$state,
		AuthService,
		$translate,
		Session,
		api,
		$mdDialog,
		$filter
	) {
		$scope.credentials = {
			username: '',
			password: ''
		};

		AuthService.logout();
		var auth2;

		var magic_access = $location.search().magic_access;
		var direct_voting = $location.search().new_voting;
		var voting_id = $location.search().voting_id;

		var property_id = $location.search().property_id;

		var redirect_to = '';

		if (magic_access && magic_access !== '') {
			magicLinkLogin(magic_access);
		}

		if ($location.search().redirect_to) {
			redirect_to = $location.search().redirect_to;
		}

		$scope.errors = {};

		$scope.login = function() {
			if ($scope.credentials.username === '' || $scope.credentials.password === '') {
				$scope.errors.empty = true;
				return;
			}
			$scope.loading = true;
			AuthService.login($scope.credentials).then(
				function(user) {
					if (redirect_to) {
						$state.go('loading', { demo: false, redirect_to: redirect_to });
					} else {
						if ($scope.credentials.username == 'demo') {
							$state.go('loading', { demo: true });
						} else {
							$state.go('loading', { demo: false });
						}
					}
				},
				function() {
					$scope.errors.wrong = true;
					$scope.loading = false;
				}
			);
		};

		$scope.changeLanguage = function(langKey) {
			$translate.use(langKey);
			setTimeout(function() {
				$('#googleSignIn div div span span:last').text($filter('translate')('LOGIN.GOOGLE_SIGNIN_TEXT'));
				$('#googleSignIn div div span span:first').text($filter('translate')('LOGIN.GOOGLE_SIGNIN_TEXT'));
			}, 50);
		};

		$scope.activeLang = function(langKey) {
			if ($translate.use() === langKey) {
				return true;
			} else {
				return false;
			}
		};
	});
