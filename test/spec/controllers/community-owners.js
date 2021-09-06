'use strict';

describe('Controller: CommunityOwnersCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var CommunityOwnersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommunityOwnersCtrl = $controller('CommunityOwnersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
