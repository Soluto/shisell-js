import {expect} from 'chai';
import {SinonSpy, fake, assert} from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withExtras} from '../../src/internal/extenders/withExtras';

describe('extenders/withExtras', () => {
  const extras = {
    key: 'value',
  };
  let dispatch: SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add extras to context', () => {
    const expected = new AnalyticsContext();
    Object.assign(expected.ExtraData, extras);

    const extend = withExtras(extras);

    extend(analyticsDispatcher).dispatch();

    assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const extend = withExtras(extras);

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
      const extend = withExtras(null as any);

      const newDispatcher = extend(analyticsDispatcher);
      expect(newDispatcher).to.equal(analyticsDispatcher);
    });

    it('should throw if not prod env', () => {
      expect(() => withExtras(null as any)).to.throw(TypeError);
    });
  });
});
