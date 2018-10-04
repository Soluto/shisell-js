import * as sinon from 'sinon';
import {AnalyticsEventModel} from '../../src/internal/AnalyticsEventModel';
import {consoleWriter} from '../../src/internal/writers/consoleWriter';

describe('writers/consoleWriter', () => {
  let consoleSpy: sinon.SinonSpy;

  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleSpy.restore();
  });

  it('should write to console', () => {
    const model = new AnalyticsEventModel();
    model.ExtraData.key = 'value';
    model.Name = 'eventName';

    consoleWriter(model);

    sinon.assert.calledOnce(consoleSpy);
    sinon.assert.calledWithExactly(consoleSpy, JSON.stringify(model));
  });
});
