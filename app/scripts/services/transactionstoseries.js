'use strict';

/**
 * @ngdoc service
 * @name comunitariaApp.TransactionsToSeries
 * @description
 * # TransactionsToSeries
 * Service in the comunitariaApp.
 */
angular.module('comunitariaApp')
  .service('TransactionsToSeries', function () {
    return function(transactions){

      Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
      }

      function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
          dateArray.push( new Date (currentDate) )
          currentDate = currentDate.addDays(1);
        }
        return dateArray;
      }


      var sumFunc = function(sum, n)
        { return sum + n; }
      ;

      var trans = _.map(transactions, function(v){
        var d = new Date(v.date);
        d.setHours(0, 0, 0, 0);
        v.datetime = v.date;
        v.date = d;
        v.amount = parseFloat(v.amount);
        v.balance = parseFloat(v.balance);
        return v;
      })

      var minDate = _.min(trans, 'date').date;
      var maxDate = _.max(trans, 'date').date;

      var dates = getDates(minDate, maxDate);

      var ingresos = _.map(dates, function(d){

          return {x: d,
          y: _.chain(trans)
          .filter(function(t){return t.date.getTime() == d.getTime();})
          .map(function(v){ if(v.type === "I") return v.amount; else return 0;})
          .reduce(sumFunc).value()};
      });

      var egresos = _.map(dates, function(d){
        return {x: d,
          y:_.chain(trans)
        .filter(function(t){return t.date.getTime() == d.getTime();})
        .map(function(v){ if(v.type === "O") return v.amount; else return 0;})
        .reduce(sumFunc).value()};
      });

      var balance = _.map(dates, function(d){


        return {x: d,
        y: _.chain(trans)
        .filter(function(t){return t.date.getTime() <= d.getTime();})
        .sortBy('datetime')
        .last()
        .value()
        .balance};
      });



      return [
        {
          "key" : "Ingresos" ,
          "type": "bar",
          "values" : ingresos,
          "yAxis": 1
        },
        {
          "key" : "Gastos" ,
          "type": "bar",
          "values" : egresos,
          "yAxis": 1
        },
        {
          "key" : "Balance" ,
          "type": "line",
          "values" : balance,
          "yAxis": 1
        }
      ]
      };
  });
