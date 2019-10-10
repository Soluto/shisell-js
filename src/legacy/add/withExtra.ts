import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {withExtra as higherOrder} from '../../extenders';

function withExtra<T>(this: AnalyticsDispatcher<T>, key: string, value: any) {
  return higherOrder(key, value)(this);
}

(AnalyticsDispatcher as any).prototype.withExtra = withExtra;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    withExtra: typeof withExtra;
  }
}
