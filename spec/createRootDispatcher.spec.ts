import * as sinon from 'sinon';
import {AnalyticsDispatcher} from '../src/internal/AnalyticsDispatcher';
import {AnalyticsEventModel} from '../src/internal/AnalyticsEventModel';
import {createRootDispatcher} from '../src/internal/createRootDispatcher';
import defaultFilters from '../src/internal/filters/defaultFilters';

describe('createRootDispatcher', () => {
  let rootDispatcher: AnalyticsDispatcher<any>;
  let writer: sinon.SinonSpy;
  let clock: sinon.SinonFakeTimers;

  before(() => {
    clock = sinon.useFakeTimers(new Date(2016, 1, 1).getTime());
  });

  after(() => {
    clock.restore();
  });

  beforeEach(() => {
    writer = sinon.fake();
    rootDispatcher = createRootDispatcher(writer);
  });

  it('should call writer with event model', async () => {
    await rootDispatcher.dispatch();
    sinon.assert.calledOnce(writer);
    sinon.assert.calledWithExactly(writer, sinon.match.instanceOf(AnalyticsEventModel));
  });

  it('should add default filters', async () => {
    const expected = new AnalyticsEventModel();
    await defaultFilters.reduce(async (acc, filter) => {
      await acc;
      await filter(expected);
    }, Promise.resolve());

    await rootDispatcher.dispatch();

    sinon.assert.calledOnce(writer);
    sinon.assert.calledWithExactly(writer, expected);
  });
});
