import {expect} from 'chai';
import {SinonSpy, fake, assert} from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withIdentities} from '../../src/internal/extenders/withIdentities';

describe('extenders/withIdentities', () => {
  const identities = {
    key: 'value',
  };
  let dispatch: SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add identities to context', () => {
    const expected = new AnalyticsContext();
    Object.assign(expected.Identities, identities);

    const extend = withIdentities(identities);

    extend(analyticsDispatcher).dispatch();

    assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const extend = withIdentities(identities);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });

  it('should not throw if corrupted input', () => {
    const extend = withIdentities(null as any);

    const newDispatcher = extend(analyticsDispatcher);
    expect(newDispatcher).to.equal(analyticsDispatcher);
  });
});
