'use strict';

describe('Service: TransactionsToSeries', function () {

  // load the service's module
  beforeEach(module('comunitariaApp'));

  // instantiate service
  var TransactionsToSeries;
  beforeEach(inject(function (_TransactionsToSeries_) {
    TransactionsToSeries = _TransactionsToSeries_;
  }));

  it('should do something', function () {
    expect(!!TransactionsToSeries).toBe(true);
  });

});
