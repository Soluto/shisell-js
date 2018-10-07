import {AnalyticsContext} from '../AnalyticsContext';
import {withContext} from './withContext';

export function withMeta(key: string, value: any) {
  const newContext = new AnalyticsContext();
  newContext.MetaData[key] = value;
  return withContext(newContext);
}
