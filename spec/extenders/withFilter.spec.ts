import {expect} from 'chai';
import * as sinon from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withFilter} from '../../src/internal/extenders/withFilter';

describe('extenders/withFilter', () => {
  let filter: sinon.SinonSpy;
  let dispatch: sinon.SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    filter = sinon.fake();
    dispatch = sinon.fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add filter to context', () => {
    const expected = new AnalyticsContext();
    expected.Filters.push(filter);

    const extend = withFilter(filter);

    extend(analyticsDispatcher).dispatch();

    sinon.assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const expected = new AnalyticsContext();
    expected.Filters.push(filter);

    const extend = withFilter(filter);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });
});
