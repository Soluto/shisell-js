import {AnalyticsContext} from '../AnalyticsContext';
import {withContext} from './withContext';

export function createScoped(scope: string) {
  const newContext = new AnalyticsContext();
  newContext.Scopes.push(scope);
  return withContext(newContext);
}
