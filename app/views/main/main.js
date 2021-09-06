'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comunitariaApp
 */
angular
    .module('comunitariaApp')
    .controller('MainCtrl', function(
        backend,
        community,
        api,
        $filter,
        $scope,
        Session,
        $window,
        $translate,
        $state,
        $rootScope,
        $stateParams,
        AuthService,
        AUTH_EVENTS,
        $mdDialog,
        Upload,
        $timeout,
        $mdSidenav
    ) {
        //AuthService.init();
        $scope.community = $state.params.community;
        api.community.get({ community: $scope.community }).$promise.then(function(com) {
            $scope.community_data = com;
            $window.localStorage.setItem('community_data', JSON.stringify(com));
        });

        if (!AuthService.isAuthenticated()) {
            AuthService.setBackState($state.$current.name, $state.params);
            $state.go('login');
            return;
        }
        $scope.$on(AUTH_EVENTS.notAuthorized, function(event, id) {
            AuthService.setBackState($state.$current.name, $state.params);
            AuthService.logout();
            $state.go('login');
            return;
        });
        $scope.$on(AUTH_EVENTS.forbidden, function(event, id) {
            AuthService.setBackState($state.$current.name, $state.params);
            AuthService.logout();
            $state.go('login');
            return;
        });

        $('.header_user').hover(
            function() {
                $('#navbar-menu').addClass('active');
            },
            function() {
                $('#navbar-menu').removeClass('active');
            }
        );

        $scope.toggleMenu = function() {
            $('#navbar-menu').toggleClass('active');
        };

        //$scope.user = $window.localStorage.current_username;
        $scope.user = JSON.parse($window.localStorage.getItem('user'));
        $scope.user_data = JSON.parse($window.localStorage.getItem('user_community'));

        $scope.is_active_user = JSON.parse($window.localStorage.getItem('is_active'));
        $scope.is_admin = JSON.parse(localStorage.getItem('user_community')).administrator;
        var property_id = JSON.parse($window.localStorage.getItem('property_id'));

        $scope.supervecina_url =
            'https://chat.supervecina.com?magic_token=' + $scope.user.magic_token + '&community=' + community;

        $scope.budgetAppUrl =
            'https://presupuestos.supervecina.com/#/step1?token=' + $scope.user.magic_token + '&cid=' + community;

        if ($scope.user.avatar) {
            $scope.user.avatar = backend + $scope.user.avatar;
        }

        $scope.changeLanguage = function(langKey) {
            $scope.langKey = langKey;
            $translate.use(langKey);
        };

        $scope.activeLang = function(langKey) {
            if ($translate.use() === langKey) {
                return true;
            } else {
                return false;
            }
        };

        $scope.isActive = function(root) {
            return $state.includes(root);
        };


        $scope.goToSupervecina = function() {
            $window.open($scope.supervecina_url, '_blank');
        };

        $scope.goToLegal = function() {
            $window.open($scope.supervecina_url, '_blank');
        };

        $scope.goToForum = function() {
            $rootScope.toggleLeftSidenav();
            $window.open($scope.community_data.community_forum, '_blank');
        };

        $scope.goToBudgetApp = function() {
            $rootScope.toggleLeftSidenav();
            $window.open($scope.budgetAppUrl, '_blank');
        };

        $scope.logout = function() {
            $scope.toggleMenu();
            var confirm = $mdDialog
                .confirm()
                .title($filter('translate')('COMMON.LOGOUT_MESSAGE'))
                .ok($filter('translate')('COMMON.YES'))
                .cancel($filter('translate')('COMMON.NO'));
            $mdDialog.show(confirm).then(
                function() {
                    $state.go('logout');
                },
                function() {}
            );
        };
    });
