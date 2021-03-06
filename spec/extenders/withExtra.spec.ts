import {expect} from 'chai';
import {SinonSpy, fake, assert} from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withExtra} from '../../src/internal/extenders/withExtra';

describe('extenders/withExtra', () => {
  const extraKey = 'key';
  const extraValue = 'value';
  let dispatch: SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add extra data to context', () => {
    const expected = new AnalyticsContext();
    expected.ExtraData[extraKey] = extraValue;

    const extend = withExtra(extraKey, extraValue);

    extend(analyticsDispatcher).dispatch();

    assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const extend = withExtra(extraKey, extraValue);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });
});
