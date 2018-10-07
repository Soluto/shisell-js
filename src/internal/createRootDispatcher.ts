import {AnalyticsContext} from './AnalyticsContext';
import {AnalyticsDispatcher} from './AnalyticsDispatcher';
import {AnalyticsEventModel} from './AnalyticsEventModel';
import {withFilters} from './extenders/withFilters';
import defaultFilters from './filters/defaultFilters';
import {PromiseOrValue} from './types';

export type EventModelWriter<T> = (event: AnalyticsEventModel) => PromiseOrValue<T>;

export function createRootDispatcher<T>(eventModelWriter: EventModelWriter<T>, rootContext?: AnalyticsContext) {
  return new AnalyticsDispatcher(async (eventName, context) => {
    const eventModel = await context.toEventModel(eventName);
    return await eventModelWriter(eventModel);
  }, rootContext).extend(withFilters(defaultFilters));
}
