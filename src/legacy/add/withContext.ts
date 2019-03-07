import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {AnalyticsContext} from '../../internal/AnalyticsContext';
import {withContext as higherOrder} from '../../extenders';

function withContext<T>(this: AnalyticsDispatcher<T>, analyticsContext: AnalyticsContext) {
  return higherOrder(analyticsContext)(this);
}

(AnalyticsDispatcher as any).prototype.withContext = withContext;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    withContext: typeof withContext;
  }
}
