import {expect} from 'chai';
import * as sinon from 'sinon';
import {addTime} from '../../src/internal/filters/addTime';

describe('filters/addTime', () => {
  let clock: sinon.SinonFakeTimers;

  before(() => {
    clock = sinon.useFakeTimers(new Date());
  });

  after(() => {
    clock.restore();
  });

  it('should add current ISO datetime string to event model', () => {
    const eventModel = {
      ExtraData: {},
    };
    addTime(eventModel as any);

    const expectedEventModel = {
      ExtraData: {
        Time: new Date().toISOString(),
      },
    };

    expect(eventModel).to.deep.equal(expectedEventModel);
  });
});
