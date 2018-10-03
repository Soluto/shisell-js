import {expect} from 'chai';
import {AnalyticsEventModel} from '../src/internal/AnalyticsEventModel';

describe('AnalyticsEventModel', () => {
  let eventModel: AnalyticsEventModel;

  beforeEach(() => {
    eventModel = new AnalyticsEventModel();
  });

  it('should have default values', () => {
    expect(eventModel.Name).to.deep.equal('');
    expect(eventModel.Scope).to.deep.equal('');
    expect(eventModel.ExtraData).to.deep.equal({});
    expect(eventModel.Identities).to.deep.equal({});
    expect(eventModel.MetaData).to.deep.equal({});
  });
});
