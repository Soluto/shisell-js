var assert = require('assert');
var sinon = require('sinon');
var chai = require("chai");
var sinonChai = require("sinon-chai");
var Promise = require('bluebird');

chai.should();
chai.use(sinonChai);

var createRootDispatcher = require('../index.js').createRootDispatcher;
var rootDispatcher;
var eventModel;
describe('RootDispatcher', function() {
  beforeEach(function(){
    // dispatch = sinon.spy();
    rootDispatcher = createRootDispatcher(function(model) {
      console.log('here');
      eventModel = model;
    });
  });

  describe('dispatch', function () {
    it('should concatinate scopes with _', function () {
      var scope1 = "scope1";
      var scope2 = "scope2";
      var eventName = "event";

      rootDispatcher.createScoped(scope1).createScoped(scope2).dispatch(eventName)
      .then(function(){
        eventModel.Scope.should.be.equal(scope1 + "_" + scope2);
      });
    });
  });
});
