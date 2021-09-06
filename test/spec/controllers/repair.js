'use strict';

describe('Controller: RepairCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var RepairCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepairCtrl = $controller('RepairCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
