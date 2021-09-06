'use strict';

/**
 * @ngdoc directive
 * @name comunitariaApp.directive:selectDate
 * @description
 * # selectDate
 */

angular.module('comunitariaApp')
    .directive("selectDate", function() {
        function linker(scope, element, attributes) {
            scope.shouldShowDropDown = false;
            scope.showDropDown = function() {
                scope.shouldShowDropDown = true;
            }
            scope.hideDropDown = function() {
                scope.shouldShowDropDown = false;
            }
            scope.toggleDropDown = function() {
                scope.shouldShowDropDown = !scope.shouldShowDropDown;
            }

            scope.from = 'Feb 1,2017';
            scope.to = 'Feb 28,2019';

            scope.updateDateRange = function() {
                scope.from = 'aaa';
                console.log('aaaa');
            }
        }
        return {
            restrict: 'E',
            templateUrl: 'views/select-date.tpl.html',
            link: linker
        };
    });