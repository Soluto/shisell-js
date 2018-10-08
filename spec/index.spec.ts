import {expect} from 'chai';
import * as index from '../src/index';

describe('index', () => {
  it('should export AnalyticsContext', () => {
    expect(index.AnalyticsContext).to.exist;
    // @ts-ignore TS6133
    let filter: index.AnalyticsFilter;
  });

  it('should export AnalyticsDispatcher', () => {
    expect(index.AnalyticsDispatcher).to.exist;
    // @ts-ignore TS6133
    let dispatchAnalytics: index.DispatchAnalytics<any>;
    // @ts-ignore TS6133
    let analyticsExtender: index.AnalyticsExtender<any>;
  });

  it('should export createRootDispatcher', () => {
    expect(index.createRootDispatcher).to.exist;
    // @ts-ignore TS6133
    let eventModelWriter: index.EventModelWriter<any>;
  });

  it('should export types', () => {
    // @ts-ignore TS6133
    let dataMap: index.DataMap;
    // @ts-ignore TS6133
    let promiseOrValue: index.PromiseOrValue<any>;
    // @ts-ignore TS6133
    let analyticsEventModel: index.AnalyticsEventModel;
  });
});
