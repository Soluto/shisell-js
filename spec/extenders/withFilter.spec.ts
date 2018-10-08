import {expect} from 'chai';
import {SinonSpy, fake, assert} from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withFilter} from '../../src/internal/extenders/withFilter';

describe('extenders/withFilter', () => {
  let filter: SinonSpy;
  let dispatch: SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    filter = fake();
    dispatch = fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add filter to context', () => {
    const expected = new AnalyticsContext();
    expected.Filters.push(filter);

    const extend = withFilter(filter);

    extend(analyticsDispatcher).dispatch();

    assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const extend = withFilter(filter);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });
  describe('corrupted input', () => {
    let originalEnv: any;

    beforeEach(() => {
      originalEnv = process.env;
      process.env = Object.assign({}, originalEnv);
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should not throw if corrupted input', () => {
      process.env.NODE_ENV = 'production';
      const extend = withFilter('not filter' as any);

      const newDispatcher = extend(analyticsDispatcher);
      expect(newDispatcher).to.equal(analyticsDispatcher);
    });

    it('should throw if not prod env', () => {
      expect(() => withFilter(null as any)).to.throw(TypeError);
    });
  });
});
