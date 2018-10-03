import {expect} from 'chai';
import * as sinon from 'sinon';
import {AnalyticsContext} from '../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../src/internal/AnalyticsDispatcher';

describe('AnalyticsDispatcher', () => {
  let dispatch: sinon.SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = sinon.fake();
    const context = new AnalyticsContext();
    context.ExtraData.key = 'value';
    analyticsDispatcher = new AnalyticsDispatcher(dispatch, context);
  });

  describe('dispatch', () => {
    it('should call dispatch with union contexts', () => {
      const context = new AnalyticsContext();
      context.Identities.id = '12345';

      const expectedContext = analyticsDispatcher.context.union(context);

      const eventName = 'event';

      analyticsDispatcher.dispatch(eventName, context);

      sinon.assert.calledOnce(dispatch);
      sinon.assert.calledWithExactly(dispatch, eventName, expectedContext);
    });

    it('should call dispatch with root context if context is undefined', () => {
      const eventName = 'event';

      analyticsDispatcher.dispatch(eventName);

      sinon.assert.calledOnce(dispatch);
      sinon.assert.calledWithExactly(dispatch, eventName, analyticsDispatcher.context);
    });

    it('should not throw it eventName is undefined', () => {
      analyticsDispatcher.dispatch();

      sinon.assert.calledOnce(dispatch);
      sinon.assert.calledWithExactly(dispatch, '', sinon.match.instanceOf(AnalyticsContext));
    });
  });

  describe('extend', () => {
    it('should return self if no extenders passed', () => {
      const result = analyticsDispatcher.extend();
      expect(result).to.equal(analyticsDispatcher);
    });

    it('should call extender', () => {
      const expectedResult = 'some_dispatcher';
      const extender = sinon.fake.returns(expectedResult);

      const result = analyticsDispatcher.extend(extender);

      sinon.assert.calledOnce(extender);
      sinon.assert.calledWithExactly(extender, analyticsDispatcher);

      expect(result).to.equal(expectedResult);
    });

    it('should call all extenders sequentially', () => {
      const expectedResult = 'some_dispatcher';
      const extenders = [sinon.fake.returns('a'), sinon.fake.returns('b'), sinon.fake.returns(expectedResult)];

      const result = analyticsDispatcher.extend(...extenders);

      extenders.forEach(x => sinon.assert.calledOnce(x));
      sinon.assert.callOrder(...extenders);

      expect(result).to.equal(expectedResult);
    });
  });
});
