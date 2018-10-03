import {AnalyticsContext} from '../AnalyticsContext';
import {DataMap} from '../types';
import {identity, isObject} from './utils';
import {withContext} from './withContext';

export function withExtras<T>(extras: DataMap) {
  if (!isObject(extras)) {
    return identity;
  }

  const newContext = new AnalyticsContext();
  Object.assign(newContext.ExtraData, extras);
  return withContext<T>(newContext);
}
