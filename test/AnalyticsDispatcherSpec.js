var sinon = require('sinon');
var chai = require("chai");

chai.should();

var AnalyticsDispatcher = require('../lib/AnalyticsDispatcher.js');
var AnalyticsContext = require('../lib/AnalyticsContext.js');

describe('AnalyticsDispatcher', function () {
  var dispatch;
  var analyticsDispathcer;

  beforeEach(function () {
    dispatch = sinon.fake();
    analyticsDispathcer = new AnalyticsDispatcher(dispatch, null);
  });

  describe('dispatch', function () {
    it('should called dispatch with given values', function () {
      var context = new AnalyticsContext();
      var eventName = 'event';

      analyticsDispathcer.dispatch(eventName, context);

      sinon.assert.calledOnce(dispatch);
      sinon.assert.calledWithExactly(dispatch, eventName, context);
    });

    it('should not thrown if context is undefined', function () {
      var eventName = 'event';

      analyticsDispathcer.dispatch(eventName);

      sinon.assert.calledOnce(dispatch);
      sinon.assert.calledWithExactly(dispatch, eventName, sinon.match.object);
    });
  });

  describe('extend', function () {
    it('should call extender', function() {
      var expectedResult = 'some_dispatcher';
      var extender = sinon.fake.returns(expectedResult);

      var result = analyticsDispathcer.extend(extender);

      sinon.assert.calledOnce(extender);
      sinon.assert.calledWithExactly(extender, analyticsDispathcer);

      result.should.equal(expectedResult);
    })
  });
});
