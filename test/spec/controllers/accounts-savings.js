'use strict';

describe('Controller: AccountsSavingsCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var AccountsSavingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountsSavingsCtrl = $controller('AccountsSavingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
