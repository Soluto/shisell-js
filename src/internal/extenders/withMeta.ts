import {AnalyticsContext} from '../AnalyticsContext';
import {withContext} from './withContext';

export function withMeta<T>(key: string, value: any) {
  const newContext = new AnalyticsContext();
  newContext.MetaData[key] = value;
  return withContext<T>(newContext);
}
