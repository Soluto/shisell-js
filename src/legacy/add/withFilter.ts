import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {AnalyticsFilter} from '../../internal/AnalyticsContext';
import {withFilter as higherOrder} from '../../extenders';

function withFilter<T>(this: AnalyticsDispatcher<T>, filter: AnalyticsFilter) {
  return higherOrder(filter)(this);
}

(AnalyticsDispatcher as any).prototype.withFilter = withFilter;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    withFilter: typeof withFilter;
  }
}
