import {expect} from 'chai';
import {SinonSpy, fake, assert} from 'sinon';
import {AnalyticsContext} from '../../src/internal/AnalyticsContext';
import {AnalyticsDispatcher} from '../../src/internal/AnalyticsDispatcher';
import {withContext} from '../../src/internal/extenders/withContext';

describe('extenders/withContext', () => {
  let dispatch: SinonSpy;
  let analyticsDispatcher: AnalyticsDispatcher<any>;
  let context: AnalyticsContext;

  beforeEach(() => {
    dispatch = fake();
    context = new AnalyticsContext();
    context.ExtraData.key = 'value';
    context.Identities.id = 'identity';
    analyticsDispatcher = new AnalyticsDispatcher(dispatch, context);
  });

  it('should union contexts', () => {
    const newContext = new AnalyticsContext();
    newContext.Scopes.push('scope1');
    newContext.ExtraData.key2 = 'value2';

    const extend = withContext(newContext);

    extend(analyticsDispatcher).dispatch();

    assert.calledWithExactly(dispatch, '', context.union(newContext));
  });

  it('should not modify contexts', () => {
    const expectedContext = context.union(new AnalyticsContext());

    const newContext = new AnalyticsContext();
    newContext.Scopes.push('scope1');
    newContext.ExtraData.key2 = 'value2';

    const expectedNewContext = newContext.union(new AnalyticsContext());

    const extend = withContext(newContext);
    extend(analyticsDispatcher).dispatch();

    expect(context).to.deep.equal(expectedContext);
    expect(newContext).to.deep.equal(expectedNewContext);
  });

  it('should create AnalyticsContext instance', () => {
    const newContext: Partial<AnalyticsContext> = {ExtraData: {key2: 'value3'}};

    const extend = withContext(newContext);
    const dispatcher = extend(analyticsDispatcher);
    expect(dispatcher.context).to.be.instanceOf(AnalyticsContext);
    expect(dispatcher.context).to.deep.equal(new AnalyticsContext().union(newContext));
  });
});
