import {AnalyticsContext} from '../AnalyticsContext';
import {AnalyticsDispatcher} from '../AnalyticsDispatcher';

export function withContext(analyticsContext: AnalyticsContext) {
  return <T>(dispatcher: AnalyticsDispatcher<T>) => new AnalyticsDispatcher<T>(dispatcher.dispatch, analyticsContext);
}
