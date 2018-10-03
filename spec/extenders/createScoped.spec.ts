import {expect} from 'chai';
import * as sinon from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {createScoped} from '../../src/internal/extenders/createScoped';

describe('extenders/createScoped', () => {
  const scope = 'someScope';
  let dispatch: sinon.SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;

  beforeEach(() => {
    dispatch = sinon.fake();
    analyticsDispatcher = new AnalyticsDispatcher(dispatch);
  });

  it('should add scope to context', () => {
    const expected = new AnalyticsContext();
    expected.Scopes.push(scope);

    const extend = createScoped(scope);

    extend(analyticsDispatcher).dispatch();

    sinon.assert.calledWithExactly(dispatch, '', expected);
  });

  it('should not modify original context', () => {
    const expected = new AnalyticsContext();
    expected.Scopes.push(scope);

    const extend = createScoped(scope);

    extend(analyticsDispatcher).dispatch();

    expect(analyticsDispatcher.context).to.deep.equal(new AnalyticsContext());
  });
});
