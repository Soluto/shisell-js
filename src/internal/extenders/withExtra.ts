import {AnalyticsContext} from '../AnalyticsContext';
import {withContext} from './withContext';

export function withExtra<T>(key: string, value: any) {
  const newContext = new AnalyticsContext();
  newContext.ExtraData[key] = value;
  return withContext<T>(newContext);
}
