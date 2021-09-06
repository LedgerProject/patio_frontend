'use strict';

/**
 * @ngdoc function
 * @name comunitariaApp.controller:ScbInvoicesCtrl
 * @description
 * # ScbInvoicesCtrl
 * Controller of the comunitariaApp
 */
angular
	.module('comunitariaApp')
	.controller('ScbInvoicesCtrl', function($scope, $filter, community, api, $state, $mdDialog, $window, $timeout) {
		var usercommunity = JSON.parse(localStorage.getItem('user_community')).id;

		if ($window.localStorage.current_community !== community) {
			$state.go('login');
		}
		$('.nav').show();

		/* API CALL TO STORE NEW MEETING */
		api.get_scb_invoices.get({ usercommunity: usercommunity }).$promise.then(function(res) {
			if ((res.status = 'OK')) {
				$scope.invoices = res;
			} else {
				var error = $mdDialog.alert().title(res.error_text).ok('Ok');
				$mdDialog.show(error);
			}
		});

		api.get_scb_transactions.get({ community: community }).$promise.then(function(res) {
			if ((res.status = 'OK')) {
				$scope.transactions = res;
			} else {
				var error = $mdDialog.alert().title(res.error_text).ok('Ok');
				$mdDialog.show(error);
			}
		});

		$scope.paidInvoice = function(ev, invoice) {
			$mdDialog.show({
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				templateUrl: 'views/scb.invoices/invoice.detail.template.html',
				locals: { apitoshi_key: invoice.payment_req },
				controller: DialogController
			});

			function DialogController($scope, $mdDialog, apitoshi_key) {
				$scope.apitoshi_key = apitoshi_key;
				$scope.copyTextToClipboard = function(str) {
					// Create new element
					var el = document.createElement('textarea');
					// Set value (string to be copied)
					el.value = str;
					// Set non-editable to avoid focus and move outside of view
					el.setAttribute('readonly', '');
					el.style = { position: 'absolute', left: '-9999px' };
					document.body.appendChild(el);
					// Select text inside element
					el.select();
					// Copy text to clipboard
					document.execCommand('copy');
					// Remove temporary element
					document.body.removeChild(el);
				};
				$scope.closeDialog = function() {
					$mdDialog.hide();
				};
			}
		};
	});
