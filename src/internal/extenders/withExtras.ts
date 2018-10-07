import {AnalyticsContext} from '../AnalyticsContext';
import {DataMap} from '../types';
import {identity, isDataMap} from './utils';
import {withContext} from './withContext';

export function withExtras(extras: DataMap) {
  if (!isDataMap(extras)) {
    return identity;
  }

  const newContext = new AnalyticsContext();
  Object.assign(newContext.ExtraData, extras);
  return withContext(newContext);
}
