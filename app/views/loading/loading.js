'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:LoadingCtrl
 * @description
 * # LoadingCtrl
 * Controller of the comunitariaApp
 */
angular
	.module('comunitariaApp')
	.controller('LoadingCtrl', function(
		$scope,
		AuthService,
		$state,
		$stateParams,
		api,
		AUTH_EVENTS,
		$window,
		$mdDialog,
		$filter
	) {
		AuthService.init();

		$scope.$on(AUTH_EVENTS.notAuthorized, function(event, id) {
			var confirm = $mdDialog.confirm().title($filter('translate')('LOGIN.LOGIN_ERROR')).ok('Ok');
			$mdDialog.show(confirm).then(function() {
				AuthService.logout();
				$state.go('login');
				return;
			});
		});

		$scope.$on(AUTH_EVENTS.forbidden, function(event, id) {
			var confirm = $mdDialog.confirm().title($filter('translate')('LOGIN.LOGIN_ERROR')).ok('Ok');
			$mdDialog.show(confirm).then(function() {
				AuthService.logout();
				$state.go('login');
				return;
			});
		});

		if (!AuthService.isAuthenticated()) {
			AuthService.setBackState($state.$current.name, $state.params);
			$state.go('login');
		} else {
			api.invalidateCache();
			api.current_user.get().$promise.then(function(user) {
				$window.localStorage.setItem('user', JSON.stringify(user));
				$window.localStorage.setItem('user_community_list', JSON.stringify(user.communities_data));
				if (user.communities_data.length > 1) {
					$scope.user_communities = user.communities_data;
					$scope.changeCommunity(user);
				} else {
					api.usercommunity.get({ user: user.communities[0] }).$promise.then(
						function(res) {
							$window.localStorage.setItem('user_community', JSON.stringify(res));
							$window.localStorage.setItem('current_community', res.community);
							$window.localStorage.setItem('property_id', res.property_id);
							$window.localStorage.setItem('is_active', res.is_active);
							redirectToPage(res.community, $state.params.redirect_to);
						},
						function() {
							$state.go('login');
						}
					);
				}
				var backState = AuthService.getBackState();

				backState.state = 'main.home';
				//$state.go(backState.state, backState.params);
				if (user.communities_data.length == 1) {
					//$state.go(backState.state, backState.params);
				}
			});
		}

		var redirectToPage = function(community_id, page) {
				$state.go('main.home', {
					community: community_id,
					first_login: true,
					newVotingForm: $state.params.direct_voting,
					voting_id: $state.params.voting_id
				});
		};
	});
