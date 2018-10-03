import {expect} from 'chai';
import * as sinon from 'sinon';
import {AnalyticsEventModel} from '../../src/internal/AnalyticsEventModel';
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
    const eventModel = new AnalyticsEventModel();
    addTime(eventModel);

    const expectedEventModel = new AnalyticsEventModel();
    expectedEventModel.ExtraData.Time = new Date().toISOString();

    expect(eventModel).to.deep.equal(expectedEventModel);
  });
});
