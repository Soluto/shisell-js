var assert = require('assert');
var sinon = require('sinon');
var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

var AnalyticsDispatcher = require('../lib/AnalyticsDispatcher.js');
var AnalyticsContext = require('../lib/AnalyticsContext.js');
var dispatch;
var analyticsDispathcer;

describe('AnalyticsDispatcher', function() {
  beforeEach(function(){
    dispatch = sinon.spy();
    analyticsDispathcer = new AnalyticsDispatcher(dispatch, null);
  });
  describe('dispatch', function () {
    it('should called dispatch with given values', function () {
      var context = new AnalyticsContext();
      var eventName = "event";

      analyticsDispathcer.dispatch(eventName, context);

      dispatch.should.have.been.calledWith(eventName, context);
    });

    it('should not thrown if context is undefined', function () {
      var eventName = "event";

      analyticsDispathcer.dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName);
    });
  });

  describe('withContext', function () {
    it('should called dispatch with passed context', function () {
      var context = new AnalyticsContext();
      context.Scopes = ["scope"];
      var eventName = "event";

      analyticsDispathcer.withContext(context).dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName, context);
    });
  });

  describe('createScoped', function () {
    it('should called dispatch with passed scope', function () {
      var scope = "scope";
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Scopes = [scope];

      analyticsDispathcer.createScoped(scope).dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName, context);
    });
  });

  describe('withExtra', function () {
    it('should called dispatch with passed extra data', function () {
      var key = "key";
      var value = "value";
      var eventName = "event";
      var context = new AnalyticsContext();
      context.ExtraData = {key : value};

      analyticsDispathcer.withExtra(key, value).dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName, context);
    });
  });

  describe('withFilter', function () {
    it('should called dispatch with passed filter', function () {
      var filter = sinon.spy();
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Filters.push(filter);

      analyticsDispathcer.withFilter(filter).dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName, context);
    });
  });

  describe('withFilter', function () {
    it('should called dispatch with all filters', function () {
      var filter1 = sinon.spy();
      var filter2 = sinon.spy();
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Filters.push(filter1);
      context.Filters.push(filter2);

      analyticsDispathcer.withFilter(filter1).withFilter(filter2).dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName, context);
    });
  });

  describe('withFilters', function () {
    it('should called dispatch with all filters', function () {
      var filter1 = sinon.spy();
      var filter2 = sinon.spy();
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Filters.push(filter1);
      context.Filters.push(filter2);

      var filters = [filter1, filter2];
      analyticsDispathcer.withFilters(filters).dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName, context);
    });
  });

  describe('withMeta', function () {
    it('should called dispatch with passed meta data', function () {
      var key = "key";
      var value = "value";
      var eventName = "event";
      var context = new AnalyticsContext();
      context.MetaData = {key : value};

      analyticsDispathcer.withMeta(key, value).dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName, context);
    });
  });

  describe('withIdentity', function () {
    it('should called dispatch with passed identity', function () {
      var key = "key";
      var value = "value";
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Identities = {key : value};

      analyticsDispathcer.withIdentity(key, value).dispatch(eventName);

      dispatch.should.have.been.calledWith(eventName, context);
    });
  });
});
