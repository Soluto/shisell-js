import {expect} from 'chai';
import * as index from '../src/index';

describe('index', () => {
  it('should export AnalyticsContext', () => {
    expect(index.AnalyticsContext).to.exist;
    let filter: index.AnalyticsFilter;
  });

  it('should export AnalyticsDispatcher', () => {
    expect(index.AnalyticsDispatcher).to.exist;
    let dispatchAnalytics: index.DispatchAnalytics<any>;
    let analyticsExtender: index.AnalyticsExtender<any>;
  });

  it('should export AnalyticsEventModel', () => {
    expect(index.AnalyticsEventModel).to.exist;
  });

  it('should export createRootDispatcher', () => {
    expect(index.createRootDispatcher).to.exist;
    let eventModelWriter: index.EventModelWriter<any>;
  });

  it('should export types', () => {
    let dataMap: index.DataMap;
    let promiseOrValue: index.PromiseOrValue<any>;
  });
});
