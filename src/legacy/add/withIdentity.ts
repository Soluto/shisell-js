import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {withIdentity as higherOrder} from '../../extenders';

function withIdentity<T>(this: AnalyticsDispatcher<T>, key: string, value: any) {
  return higherOrder(key, value)(this);
}

(AnalyticsDispatcher as any).prototype.withIdentity = withIdentity;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    withIdentity: typeof withIdentity;
  }
}
