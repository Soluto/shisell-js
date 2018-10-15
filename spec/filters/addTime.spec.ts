import {expect} from 'chai';
import {SinonFakeTimers, useFakeTimers} from 'sinon';
import {addTime} from '../../src/internal/filters/addTime';

describe('filters/addTime', () => {
  let clock: SinonFakeTimers;

  before(() => {
    clock = useFakeTimers(new Date());
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
