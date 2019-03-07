import {AnalyticsDispatcher} from '../../internal/AnalyticsDispatcher';
import {createScoped as higherOrder} from '../../extenders';

function createScoped<T>(this: AnalyticsDispatcher<T>, scope: string) {
  return higherOrder(scope)(this);
}

(AnalyticsDispatcher as any).prototype.createScoped = createScoped;

declare module '../../internal/AnalyticsDispatcher' {
  interface AnalyticsDispatcher<T> {
    createScoped: typeof createScoped;
  }
}
