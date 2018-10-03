import {AnalyticsContext, AnalyticsFilter} from '../AnalyticsContext';
import {identity, isArray} from './utils';
import {withContext} from './withContext';

export function withFilters<T>(filters: AnalyticsFilter[]) {
  if (!isArray(filters)) {
    return identity;
  }

  const newContext = new AnalyticsContext();
  newContext.Filters.push(...filters);
  return withContext<T>(newContext);
}
