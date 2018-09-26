var shisell = require('../index.js');
var chai = require("chai");

chai.should();

describe('Index', function() {
  describe('ext', function () {
    it('should allow extending the dispatcher', function () {
      var called = false;
      shisell.ext.withTestExtention = function(){
        called = true;
      };
      new shisell.AnalyticsDispatcher().withTestExtention();
      called.should.be.true;
    });
  });
});
