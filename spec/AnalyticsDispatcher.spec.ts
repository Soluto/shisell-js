import {expect} from 'chai';
import {SinonSpy, fake, assert, match} from 'sinon';
import {AnalyticsContext} from '../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../src/internal/AnalyticsDispatcher';

describe('AnalyticsDispatcher', () => {
  let dispatch: SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = fake();
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

      assert.calledOnce(dispatch);
      assert.calledWithExactly(dispatch, eventName, expectedContext);
    });

    it('should call dispatch with root context if context is undefined', () => {
      const eventName = 'event';

      analyticsDispatcher.dispatch(eventName);

      assert.calledOnce(dispatch);
      assert.calledWithExactly(dispatch, eventName, analyticsDispatcher.context);
    });

    it('should not throw it eventName is undefined', () => {
      analyticsDispatcher.dispatch();

      assert.calledOnce(dispatch);
      assert.calledWithExactly(dispatch, '', match.instanceOf(AnalyticsContext));
    });
  });

  describe('extend', () => {
    it('should return self if no extenders passed', () => {
      const result = analyticsDispatcher.extend();
      expect(result).to.equal(analyticsDispatcher);
    });

    it('should call extender', () => {
      const expectedResult = 'some_dispatcher';
      const extender = fake.returns(expectedResult);

      const result = analyticsDispatcher.extend(extender);

      assert.calledOnce(extender);
      assert.calledWithExactly(extender, analyticsDispatcher);

      expect(result).to.equal(expectedResult);
    });

    it('should call all extenders sequentially', () => {
      const expectedResult = 'some_dispatcher';
      const extenders = [fake.returns('a'), fake.returns('b'), fake.returns(expectedResult)];

      const result = analyticsDispatcher.extend(...extenders);

      extenders.forEach(x => assert.calledOnce(x));
      assert.callOrder(...extenders);

      expect(result).to.equal(expectedResult);
    });
  });
});
