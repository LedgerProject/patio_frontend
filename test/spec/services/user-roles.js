'use strict';

describe('Service: userRoles', function () {

  // load the service's module
  beforeEach(module('comunitariaApp'));

  // instantiate service
  var userRoles;
  beforeEach(inject(function (_userRoles_) {
    userRoles = _userRoles_;
  }));

  it('should do something', function () {
    expect(!!userRoles).toBe(true);
  });

});
