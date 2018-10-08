import {AnalyticsContext} from '../AnalyticsContext';
import {DataMap} from '../types';
import {identity, isDataMap, isDevelopment} from './utils';
import {withContext} from './withContext';

export function withExtras(extras: DataMap) {
  if (!isDataMap(extras)) {
    if (isDevelopment()) {
      throw TypeError("'extras' should be an object");
    }

    return identity;
  }

  const newContext = new AnalyticsContext();
  Object.assign(newContext.ExtraData, extras);
  return withContext(newContext);
}
