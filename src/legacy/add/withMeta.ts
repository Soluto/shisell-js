import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {withMeta as higherOrder} from '../../extenders';

function withMeta<T>(this: AnalyticsDispatcher<T>, key: string, value: any) {
  return higherOrder(key, value)(this);
}

(AnalyticsDispatcher as any).prototype.withMeta = withMeta;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    withMeta: typeof withMeta;
  }
}
