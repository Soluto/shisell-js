var assert = require('assert');
var sinon = require('sinon');
var chai = require("chai");
var sinonChai = require("sinon-chai");
var Promise = require('bluebird');

chai.should();
chai.use(sinonChai);

var createRootDispatcher = require('../createRootDispatcher.js');
var rootDispatcher;
var eventModel;
describe('RootDispatcher', function() {
  beforeEach(function(){
    // dispatch = sinon.spy();
    rootDispatcher = createRootDispatcher(function(model) {
      eventModel = model;
    });
  });

  describe('dispatch', function () {
    it('should concatinate scopes with _', function (done) {
      var scope1 = "scope1";
      var scope2 = "scope2";
      var eventName = "event";

      rootDispatcher.createScoped(scope1).createScoped(scope2).dispatch(eventName)
      .then(function(){
        eventModel.Scope.should.be.equal(scope1 + "_" + scope2);
        done();
      });
    });

    it('should copy identities', function (done) {
      var id = '12345';
      rootDispatcher.withIdentity('id',id).dispatch('event')
      .then(function(){
        eventModel.Identities['id'].should.be.equal(id);
        done();
      });
    });

    it('should run all filters', function (done) {
      var firstFilter = function(model){
        return Promise.resolve()
        .then(function(){
          model.ExtraData["key1"] = "value1";
        });
      };
      var lastFilter = function(model){
        return Promise.resolve()
        .then(function(){
          model.ExtraData["key2"] = "value2";
        });
      };
      rootDispatcher.withFilter(firstFilter).withFilter(lastFilter).dispatch()
      .then(function(){
        eventModel.ExtraData["key1"].should.be.equal("value1");
        eventModel.ExtraData["key2"].should.be.equal("value2");
        done();
      });
    });

    it('should run filters sequentially', function (done) {
      var firstFilter = function(model){
        return Promise.delay(10)
        .then(function(){

          model.ExtraData["key"] = "firstFilter";

        });
      };
      var lastFilter = function(model){
        return Promise.resolve()
        .then(function(){
          model.ExtraData["key"] = "lastFilter";

        });
      };
      rootDispatcher.withFilter(firstFilter).withFilter(lastFilter).dispatch()
      .then(function(){
        eventModel.ExtraData["key"].should.be.equal("lastFilter");
        done();
      });
    });
  });
});
