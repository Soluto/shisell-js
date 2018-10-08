import * as sinon from 'sinon';
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
    const model = {
      Name: 'eventName',
      ExtraData: {
        key: 'value',
      },
    };

    consoleWriter(model as any);

    sinon.assert.calledOnce(consoleSpy);
    sinon.assert.calledWithExactly(consoleSpy, JSON.stringify(model));
  });
});
