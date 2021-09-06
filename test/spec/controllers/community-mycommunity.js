'use strict';

describe('Controller: CommunityMycommunityCtrl', function () {

  // load the controller's module
  beforeEach(module('comunitariaApp'));

  var CommunityMycommunityCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommunityMycommunityCtrl = $controller('CommunityMycommunityCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
