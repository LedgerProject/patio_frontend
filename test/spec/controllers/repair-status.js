'use strict';

describe('Controller: RepairStatusCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var RepairStatusCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepairStatusCtrl = $controller('RepairStatusCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
