import {AnalyticsContext} from './AnalyticsContext';

export type DispatchAnalytics<T> = (eventName: string, context: AnalyticsContext) => T;
export type AnalyticsExtender<T> = (dispatcher: AnalyticsDispatcher<T>) => AnalyticsDispatcher<T>;

export class AnalyticsDispatcher<T> {
  constructor(
    private readonly dispatchAnalytics: DispatchAnalytics<T>,
    readonly context: AnalyticsContext = new AnalyticsContext(),
  ) {}

  dispatch(eventName: string = '', analyticsContext?: Partial<AnalyticsContext>): T {
    const unionContext = this.context.union(analyticsContext);
    return this.dispatchAnalytics(eventName, unionContext);
  }

  extend(...extenders: Array<AnalyticsExtender<T>>): AnalyticsDispatcher<T> {
    return extenders.reduce((acc: AnalyticsDispatcher<T>, extender) => extender(acc), this);
  }
}
