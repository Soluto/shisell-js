import {AnalyticsContext} from './AnalyticsContext';
import {AnalyticsDispatcher} from './AnalyticsDispatcher';
import {withFilters} from './extenders/withFilters';
import defaultFilters from './filters/defaultFilters';
import {PromiseOrValue, AnalyticsEventModel} from './types';

export type EventModelWriter<T> = (event: AnalyticsEventModel) => PromiseOrValue<T>;

export function createRootDispatcher<T>(eventModelWriter: EventModelWriter<T>, rootContext?: AnalyticsContext) {
  return new AnalyticsDispatcher(async (eventName, context) => {
    const eventModel = await context.toEventModel(eventName);
    return await eventModelWriter(eventModel);
  }, rootContext).extend(withFilters(defaultFilters));
}
