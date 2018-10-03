import {expect} from 'chai';
import * as sinon from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withExtras} from '../../src/internal/extenders/withExtras';

describe('extenders/withExtras', () => {
  const extras = {
    key: 'value',
  };
  let dispatch: sinon.SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = sinon.fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add extras to context', () => {
    const expected = new AnalyticsContext();
    Object.assign(expected.ExtraData, extras);

    const extend = withExtras(extras);

    extend(analyticsDispatcher).dispatch();

    sinon.assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const expected = new AnalyticsContext();
    Object.assign(expected.ExtraData, extras);

    const extend = withExtras(extras);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });
});
