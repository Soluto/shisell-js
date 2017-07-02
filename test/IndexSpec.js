var shisell = require('../index.js');
var sinon = require('sinon');
var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('Index', function() {
  beforeEach(function(){

  });
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
