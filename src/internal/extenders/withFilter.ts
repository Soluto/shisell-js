import {AnalyticsFilter} from '../AnalyticsContext';
import {identity, isDevelopment} from './utils';
import {withFilters} from './withFilters';

export function withFilter(filter: AnalyticsFilter) {
  if (!filter || typeof filter !== 'function') {
    if (isDevelopment()) {
      throw TypeError("'filter' should be a function");
    }
    return identity;
  }

  return withFilters([filter]);
}
