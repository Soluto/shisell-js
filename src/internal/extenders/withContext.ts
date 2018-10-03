import {AnalyticsContext} from '../AnalyticsContext';
import {AnalyticsDispatcher} from '../AnalyticsDispatcher';

export function withContext<T>(analyticsContext: AnalyticsContext) {
  return (dispatcher: AnalyticsDispatcher<T>) => new AnalyticsDispatcher<T>(dispatcher.dispatch, analyticsContext);
}
