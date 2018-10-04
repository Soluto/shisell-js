import {AnalyticsContext, AnalyticsFilter} from '../AnalyticsContext';
import {identity} from './utils';
import {withContext} from './withContext';

export function withFilter<T>(filter: AnalyticsFilter) {
  if (!filter || typeof filter !== 'function') {
    return identity;
  }

  const newContext = new AnalyticsContext();
  newContext.Filters.push(filter);
  return withContext<T>(newContext);
}
