import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {DataMap} from '../../internal/types';
import {withExtras as higherOrder} from '../../extenders';

function withExtras<T>(this: AnalyticsDispatcher<T>, extras: DataMap) {
  return higherOrder(extras)(this);
}

(AnalyticsDispatcher as any).prototype.withExtras = withExtras;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    withExtras: typeof withExtras;
  }
}
