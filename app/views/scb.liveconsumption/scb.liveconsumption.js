'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:ScbLiveCtrl
 * @description
 * # ScbLiveCtrl
 * Controller of the comunitariaApp
 */
angular
    .module('comunitariaApp')
    .controller('ScbLiveCtrl', function(
        $scope,
        $filter,
        community,
        api,
        $state,
        $mdDialog,
        $window,
        $timeout,
        $interval
    ) {
        var usercommunity = JSON.parse(localStorage.getItem('user_community')).id;

        if ($window.localStorage.current_community !== community) {
            $state.go('login');
        }

        $('.nav').show();
        $('h4.m-title span').text('PHOTOVOLTAIC SELF-CONSUMPTION');

        $scope.user_sortType = 'time';
        $scope.user_sortReverse = true;
        $scope.common_sortType = 'time';
        $scope.common_sortReverse = true;

        $scope.consumptions = [];
        $scope.agreements = [];
        $scope.agreements_totals = {
			energy_amount: 0,
			watt_price: 0
		};
        $scope.current_user_consumption = 0;
        $scope.current_common_places_consumption = 0;
        $scope.total_user_consumption = 0;
        $scope.total_common_places_consumption = 0;

        $scope.chartData = [];
        $scope.chartLabels = ['HOA', 'Generation'];
        $scope.chartOptions = {};
        $scope.chartColors = ['#72C02C', '#3498DB', '#717984', '#F1C40F', '#FF0000', '#FFFFFF'];

        /* Function to get energy values fron backend */
        var getConsumptions = function() {
            api.get_scb_consumption
                .get({ community: community, usercommunity: usercommunity })
                .$promise.then(function(res) {
                    if ((res.status = 'OK')) {
                        // $scope.current_user_consumptions = $filter('filter')(res, {
                        //     user: usercommunity,
                        //     processed: false
                        // });
						if (!$scope.current_user_consumptions) {
                            $scope.current_user_consumptions = [];
                        }
                        $scope.common_places_consumptions = $filter('filter')(res, { user: usercommunity, processed: false });
                        calculateValues();
                    } else {
                        var error = $mdDialog.alert().title(res.error_text).ok('Ok');
                        $mdDialog.show(error);
                    }
                });
        };

        var getGenerated = function() {
            api.get_scb_generated
                .get({ community: community, usercommunity: usercommunity })
                .$promise.then(function(res) {
                    if ((res.status = 'OK')) {
						if (!$scope.common_places_consumptions) {
                            $scope.common_places_consumptions = [];
                        }
                        $scope.current_user_consumptions = $filter('filter')(res, {
                            community: community
                        });
                        // $scope.common_places_consumptions = $filter('filter')(res, { user: null, processed: false });
                        calculateValues();
                    } else {
                        var error = $mdDialog.alert().title(res.error_text).ok('Ok');
                        $mdDialog.show(error);
                    }
                });
        };


        var calculateValues = function() {
            clearEnergyTotals();
            angular.forEach($scope.current_user_consumptions, function(value, key) {
                $scope.total_user_consumption += parseFloat(value.energy_amount);
            });
            angular.forEach($scope.common_places_consumptions, function(value, key) {
                $scope.total_common_places_consumption += parseFloat(value.energy_amount);
            });

            if ($scope.current_user_consumptions.length > 0) {
                $scope.current_user_consumption = $filter('orderBy')(
                    $scope.current_user_consumptions,
                    'id',
                    'reverse'
                )[0].energy_amount;

                var now = new Date().getTime();
                var current_user_last_date = new Date(
                    $filter('orderBy')($scope.current_user_consumptions, 'id', 'reverse')[0].time
                ).getTime();

                if (now - current_user_last_date > 50000) {
                    $scope.current_user_consumption = 0;
                }
            }

            if ($scope.common_places_consumptions.length > 0) {
                $scope.current_common_places_consumption = $filter('orderBy')(
                    $scope.common_places_consumptions,
                    'id',
                    'reverse'
                )[0].energy_amount;

                var common_places_last_date = new Date(
                    $filter('orderBy')($scope.common_places_consumptions, 'id', 'reverse')[0].time
                ).getTime();

                if (now - common_places_last_date > 50000) {
                    $scope.current_common_places_consumption = 0;
                }
            }

            var user_percentage =
                parseFloat($scope.current_user_consumption) *
                100 /
                (parseFloat($scope.current_user_consumption) + parseFloat($scope.current_common_places_consumption));
            var common_percentage = 100 - user_percentage;

            $scope.chartData[0] = user_percentage.toFixed(2);
            $scope.chartData[1] = common_percentage.toFixed(2);

            $scope.chartOptions = {
                tooltips: {
                    enabled: true
                },
                legend: { display: true }
            };
        };

        var clearEnergyTotals = function() {
            $scope.chartData = [];
            $scope.total_user_consumption = 0;
            $scope.total_common_places_consumption = 0;
        };

		var getAgreements = function() {
			api.get_scb_stores
                .get({ community: community})
                .$promise.then(function(res) {
                    if ((res.status = 'OK')) {
						$scope.agreements = res;
						angular.forEach($scope.agreements, function(value, key) {
							$scope.agreements_totals.energy_amount += parseFloat(value.energy_amount);
							$scope.agreements_totals.watt_price += parseFloat(value.watt_price);
						});
                    } else {
                        var error = $mdDialog.alert().title(res.error_text).ok('Ok');
                        $mdDialog.show(error);
                    }
                });
		}

        $scope.showDialog = function(ev, cons) {
            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                templateUrl: 'views/scb.liveconsumption/consumption.detail.template.html',
                locals: { consumption: cons },
                controller: DialogController
            });

            function DialogController($scope, $mdDialog, consumption) {
                $scope.cons = consumption;
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };
            }
        };

        $scope.generateInvoice = function(value) {
            $mdDialog.show(
                $mdDialog
                .alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(false)
                .title('')
                .textContent('Your invoice is being generated. Please wait a moment...')
            );
            api.generate_invoice
                .post({ community: community, usercommunity: usercommunity })
                .$promise.then(function(res) {
                    if (res.status === 'ok') {
                        getConsumptions();
                        $mdDialog.show(
                            $mdDialog
                            .alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('')
                            .textContent('Your invoice has been created. Check the invoices page to pay it')
                            .ok('Ok')
                        );
                    }
                });
        };

        getConsumptions();
		getAgreements();

        var onTimeout = $interval(function() {
            getConsumptions();
			getGenerated();
        }, 1000);

        $scope.$on('$destroy', function() {
            if (onTimeout) {
                $interval.cancel(onTimeout);
            }
        });
    });