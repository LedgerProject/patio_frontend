'use strict';

describe('Controller: MeetingsPreviousCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var MeetingsPreviousCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingsPreviousCtrl = $controller('MeetingsPreviousCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
