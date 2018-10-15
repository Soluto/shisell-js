import {SinonSpy, SinonFakeTimers, fake, useFakeTimers, assert, match} from 'sinon';
import {AnalyticsDispatcher} from '../src/internal/AnalyticsDispatcher';
import {createRootDispatcher} from '../src/internal/createRootDispatcher';
import defaultFilters from '../src/internal/filters/defaultFilters';

describe('createRootDispatcher', () => {
  let rootDispatcher: AnalyticsDispatcher<any>;
  let writer: SinonSpy;
  let clock: SinonFakeTimers;

  before(() => {
    clock = useFakeTimers(new Date(2016, 1, 1).getTime());
  });

  after(() => {
    clock.restore();
  });

  beforeEach(() => {
    writer = fake();
    rootDispatcher = createRootDispatcher(writer);
  });

  it('should call writer with event model', async () => {
    await rootDispatcher.dispatch();
    assert.calledOnce(writer);

    const analyticsEventModelMatcher = match({
      Name: match.string,
      Scope: match.string,
      ExtraData: match.object,
      MetaData: match.object,
      Identities: match.object,
    });

    assert.calledWithExactly(writer, analyticsEventModelMatcher);
  });

  it('should add default filters', async () => {
    const expected = {
      Name: '',
      Scope: '',
      ExtraData: {},
      MetaData: {},
      Identities: {},
    };
    await defaultFilters.reduce(async (acc, filter) => {
      await acc;
      await filter(expected);
    }, Promise.resolve());

    await rootDispatcher.dispatch();

    assert.calledOnce(writer);
    assert.calledWithExactly(writer, expected);
  });
});
