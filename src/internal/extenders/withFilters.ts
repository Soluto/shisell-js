import {AnalyticsContext, AnalyticsFilter} from '../AnalyticsContext';
import {identity, isDevelopment} from './utils';
import {withContext} from './withContext';

export function withFilters(filters: AnalyticsFilter[]) {
  if (!Array.isArray(filters)) {
    if (isDevelopment()) {
      throw TypeError("'filters' should be an array");
    }
    return identity;
  }

  const filteredFilters = filters.filter(x => x && typeof x === 'function');

  const newContext = new AnalyticsContext();
  newContext.Filters.push(...filteredFilters);
  return withContext(newContext);
}
