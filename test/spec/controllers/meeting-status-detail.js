'use strict';

describe('Controller: MeetingStatusDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var MeetingStatusDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingStatusDetailCtrl = $controller('MeetingStatusDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
