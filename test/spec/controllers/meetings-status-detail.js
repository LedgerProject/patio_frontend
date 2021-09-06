'use strict';

describe('Controller: MeetingsStatusDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var MeetingsStatusDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingsStatusDetailCtrl = $controller('MeetingsStatusDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
