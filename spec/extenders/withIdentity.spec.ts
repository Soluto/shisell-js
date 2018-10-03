import {expect} from 'chai';
import * as sinon from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withIdentity} from '../../src/internal/extenders/withIdentity';

describe('extenders/withIdentity', () => {
  const key = 'key';
  const value = 'value';
  let dispatch: sinon.SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = sinon.fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add identity to context', () => {
    const expected = new AnalyticsContext();
    expected.Identities[key] = value;

    const extend = withIdentity(key, value);

    extend(analyticsDispatcher).dispatch();

    sinon.assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const expected = new AnalyticsContext();
    expected.Identities[key] = value;

    const extend = withIdentity(key, value);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });
});
