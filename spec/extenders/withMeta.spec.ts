import {expect} from 'chai';
import {SinonSpy, fake, assert} from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withMeta} from '../../src/internal/extenders/withMeta';

describe('extenders/withMeta', () => {
  const key = 'key';
  const value = 'value';
  let dispatch: SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add meta data to context', () => {
    const expected = new AnalyticsContext();
    expected.MetaData[key] = value;

    const extend = withMeta(key, value);

    extend(analyticsDispatcher).dispatch();

    assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const extend = withMeta(key, value);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });
});
