import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {DataMap} from '../../internal/types';
import {withIdentities as higherOrder} from '../../extenders';

function withIdentities<T>(this: AnalyticsDispatcher<T>, identities: DataMap) {
  return higherOrder(identities)(this);
}

(AnalyticsDispatcher as any).prototype.withIdentities = withIdentities;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    withIdentities: typeof withIdentities;
  }
}
