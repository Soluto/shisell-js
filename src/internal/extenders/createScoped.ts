import {AnalyticsContext} from '../AnalyticsContext';
import {withContext} from './withContext';

export function createScoped<T>(scope: string) {
  const newContext = new AnalyticsContext();
  newContext.Scopes.push(scope);
  return withContext<T>(newContext);
}
