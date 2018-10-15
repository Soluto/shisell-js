import {AnalyticsContext, AnalyticsFilter} from '../AnalyticsContext';
import {identity, isDevelopment} from './utils';
import {withContext} from './withContext';

export function withFilter(filter: AnalyticsFilter) {
  if (!filter || typeof filter !== 'function') {
    if (isDevelopment()) {
      throw TypeError("'filter' should be a function");
    }
    return identity;
  }

  const newContext = new AnalyticsContext();
  newContext.Filters.push(filter);
  return withContext(newContext);
}
