import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {AnalyticsFilter} from '../../internal/AnalyticsContext';
import {withFilters as higherOrder} from '../../extenders';

function withFilters<T>(this: AnalyticsDispatcher<T>, filters: AnalyticsFilter[]) {
  return higherOrder(filters)(this);
}

(AnalyticsDispatcher as any).prototype.withFilters = withFilters;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    withFilters: typeof withFilters;
  }
}
