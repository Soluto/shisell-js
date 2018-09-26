var sinon = require('sinon');
var chai = require("chai");

chai.should();

var AnalyticsDispatcher = require('../lib/AnalyticsDispatcher.js');
var AnalyticsContext = require('../lib/AnalyticsContext.js');

var withContext = require('../lib/extenders/withContext.js');
var createScoped = require('../lib/extenders/createScoped.js');
var withExtra = require('../lib/extenders/withExtra.js');
var withExtras = require('../lib/extenders/withExtras.js');
var withFilter = require('../lib/extenders/withFilter.js');
var withFilters = require('../lib/extenders/withFilters.js');
var withMeta = require('../lib/extenders/withMeta.js');
var withIdentity = require('../lib/extenders/withIdentity.js');
var withIdentities = require('../lib/extenders/withIdentities.js');

describe('extenders', function() {
  var dispatch;
  var analyticsDispathcer;

  beforeEach(function(){
    dispatch = sinon.fake();
    analyticsDispathcer = new AnalyticsDispatcher(dispatch, null);
  });

  describe('withContext', function () {
    it('should called dispatch with passed context', function () {
      var context = new AnalyticsContext();
      context.Scopes = ["scope"];
      var eventName = "event";

      analyticsDispathcer.extend(withContext(context)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });

  describe('createScoped', function () {
    it('should called dispatch with passed scope', function () {
      var scope = "scope";
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Scopes = [scope];

      analyticsDispathcer.extend(createScoped(scope)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });

  describe('withExtra', function () {
    it('should called dispatch with passed extra data', function () {
      var key = "key";
      var value = "value";
      var eventName = "event";
      var context = new AnalyticsContext();
      context.ExtraData = {key : value};

      analyticsDispathcer.extend(withExtra(key, value)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });

  describe('withExtras', function () {
    it('should called dispatch with all extras', function () {
      var extras = {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'};
      var eventName = "event";
      var context = new AnalyticsContext();
      context.ExtraData = extras;

      analyticsDispathcer.extend(withExtras(extras)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });

  describe('withFilter', function () {
    it('should called dispatch with passed filter', function () {
      var filter = sinon.fake();
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Filters.push(filter);

      analyticsDispathcer.extend(withFilter(filter)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });

    it('should called dispatch with all filters', function () {
      var filter1 = sinon.fake();
      var filter2 = sinon.fake();
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Filters.push(filter1);
      context.Filters.push(filter2);

      analyticsDispathcer.extend(withFilter(filter1), withFilter(filter2)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });

  describe('withFilters', function () {
    it('should called dispatch with all filters', function () {
      var filter1 = sinon.fake();
      var filter2 = sinon.fake();
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Filters.push(filter1);
      context.Filters.push(filter2);

      var filters = [filter1, filter2];
      analyticsDispathcer.extend(withFilters(filters)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });

  describe('withMeta', function () {
    it('should called dispatch with passed meta data', function () {
      var key = "key";
      var value = "value";
      var eventName = "event";
      var context = new AnalyticsContext();
      context.MetaData = {key : value};

      analyticsDispathcer.extend(withMeta(key, value)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });

  describe('withIdentity', function () {
    it('should called dispatch with passed identity', function () {
      var key = "key";
      var value = "value";
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Identities = {key : value};

      analyticsDispathcer.extend(withIdentity(key, value)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });

  describe('withIdentities', function () {
    it('should called dispatch with all passed identities', function () {
      var identities = {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'};
      var eventName = "event";
      var context = new AnalyticsContext();
      context.Identities = identities;

      analyticsDispathcer.extend(withIdentities(identities)).dispatch(eventName);

      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });
  });
});
