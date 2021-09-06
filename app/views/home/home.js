'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the comunitariaApp
 */
angular
    .module('comunitariaApp')
    .controller('HomeCtrl', function($scope, community, $filter, $state, api, $window, $mdDialog) {
        if ($window.localStorage.getItem('current_community') !== community) {
            $state.go('login');
        }

        $('.md-sidenav').toggleClass('active');
        // $state.go('main.meetings.vote', { newVotingForm: false, voting_id: $state.params.voting_id });
        var property_id = JSON.parse($window.localStorage.getItem('property_id'));

        /* Check if community is active/iactive to allow user post data */
        if (!JSON.parse($window.localStorage.getItem('is_active'))) {
            if (!$state.params.newVotingForm && !$state.params.voting_id) {
                if ($state.params.first_login) {
                    var notice = $mdDialog
                        .alert()
                        .title($filter('translate')('COMMON.INACTIVE_COMMUNITY'))
                        .textContent($filter('translate')('COMMON.INACTIVE_COMMUNITY_HOME_TEXT'))
                        .ok('Ok');
                    $mdDialog.show(notice).then(function() {});
                }
            }
        }

        api.home_page_summary.get({ id: community }).$promise.then(function(res) {
            if (res.error) {
                $state.go('login');
            }
            $scope.community_data = res;
            if ($scope.community_data.meeting_date) {
                $scope.community_data.meeting_date = new Date($scope.community_data.meeting_date.split('T', 1));
            } else {
                // $scope.community_data.meeting_date = 'No hay juntas';
                $scope.community_data.meeting_date = $filter('translate')('REPAIRS.NEW.NO_MEETINGS');
            }
        });

        $scope.messages = [{
                text: $filter('translate')('HOME.BOARD_TEXT1'),
                date: Date.now(),
                type: 'warning'
            },
            {
                text: $filter('translate')('HOME.BOARD_TEXT2'),
                date: Date.now() - 86000000,
                type: 'success'
            }
        ];

        if ($state.params.newVotingForm) {
            $state.go('main.meetings.vote', { newVotingForm: $state.params.newVotingForm });
        }

        if ($state.params.voting_id) {
            $state.go('main.meetings.vote', { newVotingForm: false, voting_id: $state.params.voting_id });
        }

        $scope.user_data = JSON.parse(localStorage.getItem('user'));
    });