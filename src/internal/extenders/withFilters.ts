import {AnalyticsContext, AnalyticsFilter} from '../AnalyticsContext';
import {identity, isArray} from './utils';
import {withContext} from './withContext';

export function withFilters<T>(filters: AnalyticsFilter[]) {
  if (!isArray(filters)) {
    return identity;
  }

  const filteredFilters = filters.filter(x => x && typeof x === 'function');

  const newContext = new AnalyticsContext();
  newContext.Filters.push(...filteredFilters);
  return withContext<T>(newContext);
}
