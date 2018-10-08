import {expect} from 'chai';
import {SinonSpy, fake, assert} from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withFilters} from '../../src/internal/extenders/withFilters';

describe('extenders/withFilters', () => {
  let filters: SinonSpy[];
  let dispatch: SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    filters = [fake(), fake()];
    dispatch = fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add filters to context', () => {
    const expected = new AnalyticsContext();
    expected.Filters.push(...filters);

    const extend = withFilters(filters);

    extend(analyticsDispatcher).dispatch();

    assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const extend = withFilters(filters);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });

  it('should only add function filters', async () => {
    const expected = new AnalyticsContext();
    expected.Filters.push(...filters);

    const extend = withFilters(filters.concat('not a filter' as any));

    extend(analyticsDispatcher).dispatch();

    assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not throw if corrupted input', () => {
    const extend = withFilters(null as any);

    const newDispatcher = extend(analyticsDispatcher);
    expect(newDispatcher).to.equal(analyticsDispatcher);
  });
});
