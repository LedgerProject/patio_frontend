'use strict';

describe('Controller: RepairDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var RepairDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepairDetailCtrl = $controller('RepairDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
